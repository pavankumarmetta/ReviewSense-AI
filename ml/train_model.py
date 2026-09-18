import pandas as pd
import re
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("dataset/reviews.csv")

# Keep required columns
df = df[["rating", "title", "text"]]

# Remove null values
df.dropna(inplace=True)

# Combine title and text
df["review"] = df["title"] + " " + df["text"]

# Text cleaning function
def clean_text(text):

    text = str(text).lower()

    # Remove URLs
    text = re.sub(r"http\S+", "", text)

    # Remove special characters and numbers
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    # Remove single characters
    text = re.sub(r"\b[a-zA-Z]\b", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()

# Apply cleaning
df["review"] = df["review"].apply(clean_text)

# Remove duplicate reviews
df.drop_duplicates(subset=["review"], inplace=True)

# Create sentiment labels
def get_sentiment(rating):
    if rating <= 2:
        return "Negative"
    elif rating == 3:
        return "Neutral"
    else:
        return "Positive"

df["sentiment"] = df["rating"].apply(get_sentiment)

# Show original distribution
print("\nOriginal Dataset Distribution:\n")
print(df["sentiment"].value_counts())

# Balance dataset
positive = df[df["sentiment"] == "Positive"].sample(
    50000,
    random_state=42
)

negative = df[df["sentiment"] == "Negative"].sample(
    50000,
    random_state=42
)

neutral = df[df["sentiment"] == "Neutral"].sample(
    50000,
    replace=True,
    random_state=42
)

# Combine balanced dataset
balanced_df = pd.concat([positive, negative, neutral])

# Shuffle dataset
balanced_df = balanced_df.sample(frac=1, random_state=42)

# Show balanced distribution
print("\nBalanced Dataset Distribution:\n")
print(balanced_df["sentiment"].value_counts())

# Features and labels
X = balanced_df["review"]
y = balanced_df["sentiment"]

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=20000,
    ngram_range=(1, 2),
    min_df=2
)

X_vectorized = vectorizer.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42
)

# =========================
# SVM MODEL
# =========================

print("\n========== SVM MODEL ==========\n")

svm_model = LinearSVC(class_weight="balanced")

svm_model.fit(X_train, y_train)

svm_pred = svm_model.predict(X_test)

svm_accuracy = accuracy_score(y_test, svm_pred)

print(f"SVM Accuracy: {svm_accuracy * 100:.2f}%")

print("\nSVM Classification Report:\n")
print(classification_report(y_test, svm_pred))

# =========================
# LOGISTIC REGRESSION MODEL
# =========================

print("\n========== LOGISTIC REGRESSION MODEL ==========\n")

lr_model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced"
)

lr_model.fit(X_train, y_train)

lr_pred = lr_model.predict(X_test)

lr_accuracy = accuracy_score(y_test, lr_pred)

print(f"Logistic Regression Accuracy: {lr_accuracy * 100:.2f}%")

print("\nLogistic Regression Classification Report:\n")
print(classification_report(y_test, lr_pred))

# =========================
# SAVE BEST MODEL
# =========================

if svm_accuracy > lr_accuracy:

    best_model = svm_model
    best_model_name = "SVM"

else:

    best_model = lr_model
    best_model_name = "Logistic Regression"

# Save best model
joblib.dump(best_model, "sentiment_model.pkl")

# Save vectorizer
joblib.dump(vectorizer, "vectorizer.pkl")

print(f"\nBest Model: {best_model_name}")

print("\nBest model and vectorizer saved successfully!")