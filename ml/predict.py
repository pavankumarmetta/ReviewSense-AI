import joblib
import re

# Load model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Clean text function
def clean_text(text):

    text = text.lower()

    text = re.sub(r"http\S+", "", text)

    text = re.sub(r"[^a-zA-Z\s]", "", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()

# User input
review = input("Enter a review: ")

# Clean review
cleaned_review = clean_text(review)

# Vectorize review
review_vector = vectorizer.transform([cleaned_review])

# Predict sentiment
prediction = model.predict(review_vector)

# Output
print(f"\nPredicted Sentiment: {prediction[0]}")