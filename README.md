# ReviewSense AI – Sentiment Analysis Web Application

ReviewSense AI is a full-stack **Sentiment Analysis Web Application** that analyzes user reviews and classifies them into **Positive, Negative, or Neutral** sentiment.

The application combines **Machine Learning, FastAPI, React.js, and MySQL** to provide an end-to-end system where users can submit reviews, receive sentiment predictions, and store review information in a database.

---

## 🚀 Features

* Classifies reviews as **Positive, Negative, or Neutral**
* Text preprocessing and cleaning before prediction
* Uses **TF-IDF** for converting text into numerical features
* Machine Learning classification using **Linear SVM**
* FastAPI-based REST API
* Request validation using **Pydantic**
* MySQL database integration using **SQLAlchemy**
* User registration and login functionality
* Stores submitted reviews and prediction results
* React.js frontend for user interaction
* Automatic API documentation using **Swagger UI**
* CORS configuration for frontend-backend communication

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* SQLAlchemy

### Machine Learning

* Scikit-learn
* TF-IDF Vectorizer
* Linear Support Vector Machine (Linear SVM)
* Logistic Regression
* NumPy
* Joblib

### Database

* MySQL
* PyMySQL

---

## 🧠 Machine Learning Workflow

The Machine Learning model is trained using a dataset containing customer reviews.

The overall ML pipeline is:

```text
Review Dataset
      ↓
Data Cleaning
      ↓
Text Preprocessing
      ↓
Sentiment Labels
      ↓
Dataset Balancing
      ↓
Train-Test Split
      ↓
TF-IDF Vectorization
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Save Trained Model
```

### 1. Dataset

The training dataset contains review information such as:

```text
rating
title
text
```

The `title` and `text` columns are combined to create the complete review.

```python
df["review"] = df["title"] + " " + df["text"]
```

---

## 🧹 Text Preprocessing

Before training the model, review text is cleaned.

The preprocessing includes:

* Converting text to lowercase
* Removing URLs
* Removing unwanted special characters
* Removing unnecessary single characters
* Removing extra spaces
* Normalizing the review text

Example:

```text
Original:
"This Product is AMAZING!!! I really loved it."

Cleaned:
"this product is amazing i really loved it"
```

This cleaned text is then passed to the TF-IDF vectorizer.

---

## 📊 Dataset Balancing

The original dataset contained an unequal number of sentiment classes.

```text
Negative    335,626
Positive    325,030
Neutral     167,593
```

To reduce class imbalance, the dataset was balanced to:

```text
Negative    50,000
Positive    50,000
Neutral     50,000
```

Total balanced dataset:

```text
150,000 reviews
```

The balanced dataset is then divided into training and testing data.

---

## 🔢 TF-IDF Vectorization

Machine Learning models cannot directly understand raw text.

Therefore, **TF-IDF (Term Frequency–Inverse Document Frequency)** is used to convert review text into numerical feature vectors.

Example:

```text
"This product is excellent"
          ↓
Text Cleaning
          ↓
TF-IDF Vectorizer
          ↓
Numerical Feature Vector
          ↓
Machine Learning Model
```

The trained vectorizer is stored as a `.pkl` file so that the same transformation can be applied to new reviews.

---

## 🤖 Machine Learning Models

Two Machine Learning algorithms were evaluated during development:

* **Linear Support Vector Machine (Linear SVM)**
* **Logistic Regression**

Linear SVM is suitable for high-dimensional sparse text data such as TF-IDF vectors and is used for sentiment classification.

The trained model predicts one of three classes:

```text
Positive
Negative
Neutral
```

---

## 📈 Model Performance

The Linear SVM model achieved approximately:

```text
Accuracy: 66.70%
```

Classification results:

| Sentiment | Precision | Recall | F1-Score |
| --------- | --------- | ------ | -------- |
| Negative  | 0.69      | 0.70   | 0.69     |
| Neutral   | 0.56      | 0.53   | 0.54     |
| Positive  | 0.75      | 0.77   | 0.76     |

The model performed best on **Positive reviews**, while **Neutral sentiment** was comparatively more difficult to classify because neutral language often overlaps with positive and negative expressions.

---

## 💾 Trained Model Files

After training, the Machine Learning components are saved using **Joblib**.

```text
sentiment_model.pkl
vectorizer.pkl
```

### `sentiment_model.pkl`

Contains the trained Machine Learning classification model.

### `vectorizer.pkl`

Contains the trained TF-IDF vectorizer, including the vocabulary and feature mapping learned from the training dataset.

These files allow the backend to make predictions without retraining the model every time the application starts.

They are loaded using:

```python
import joblib

model = joblib.load("../ml/sentiment_model.pkl")
vectorizer = joblib.load("../ml/vectorizer.pkl")
```

---

## ⚙️ Backend – FastAPI

FastAPI is used to expose the Machine Learning model through REST APIs.

Example prediction flow:

```text
React Frontend
      ↓
HTTP POST Request
      ↓
FastAPI Endpoint
      ↓
Pydantic Validation
      ↓
Text Cleaning
      ↓
TF-IDF Vectorization
      ↓
Trained ML Model
      ↓
Sentiment Prediction
      ↓
JSON Response
      ↓
React Frontend
```

Example prediction endpoint:

```python
@app.post("/predict")
def predict_sentiment(data: ReviewRequest):

    cleaned_review = clean_text(data.review)

    review_vector = vectorizer.transform([cleaned_review])

    prediction = model.predict(review_vector)

    return {
        "review": data.review,
        "sentiment": prediction[0]
    }
```

---

## 🗄️ Database Integration

The application uses **MySQL** for persistent data storage.

FastAPI communicates with MySQL using:

```text
FastAPI
   ↓
SQLAlchemy ORM
   ↓
PyMySQL Driver
   ↓
MySQL Database
```

The database used by the application is:

```text
reviewsense_ai
```

SQLAlchemy handles communication between Python objects and relational database tables.

The main entities include:

### User

Stores registered user information.

### Review

Stores submitted reviews and related sentiment information.

---

## 🔐 User Authentication Flow

The application supports user registration and login.

### Registration

```text
User enters details
      ↓
React Frontend
      ↓
POST /register
      ↓
Pydantic validates request
      ↓
FastAPI processes request
      ↓
SQLAlchemy
      ↓
MySQL
      ↓
User stored
```

### Login

```text
User enters credentials
      ↓
React Frontend
      ↓
Login API
      ↓
FastAPI
      ↓
Database verification
      ↓
Login response
```

---

## 🔄 End-to-End Application Flow

The complete application works as follows:

```text
                 USER
                   │
                   ▼
             React Frontend
                   │
                   │ HTTP Request
                   ▼
              FastAPI Backend
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
       MySQL           ML Pipeline
       Database             │
                            ▼
                       Text Cleaning
                            │
                            ▼
                     TF-IDF Vectorizer
                            │
                            ▼
                       Linear SVM
                            │
                            ▼
                  Sentiment Prediction
                            │
                            ▼
                     FastAPI Response
                            │
                            ▼
                     React Frontend
                            │
                            ▼
                          USER
```

---

## 📁 Project Structure

```text
ReviewSense-AI/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── ml/
│   ├── train_model.py
│   ├── sentiment_model.pkl
│   ├── vectorizer.pkl
│   └── ...
│
├── dataset/
│   └── reviews.csv
│
└── README.md
```

---

## ▶️ Running the Project Locally

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ReviewSense-AI
```

---

### 2. Create Python Virtual Environment

Navigate to the backend:

```bash
cd backend
```

Create the virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

---

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

Important backend dependencies include:

```text
fastapi
uvicorn
pydantic
sqlalchemy
pymysql
scikit-learn
numpy
joblib
python-multipart
```

---

### 4. Configure MySQL

Create the database:

```sql
CREATE DATABASE reviewsense_ai;
```

Configure the MySQL connection in the backend database configuration.

Example:

```python
DATABASE_URL = "mysql+pymysql://username:password@localhost/reviewsense_ai"
```

Replace:

```text
username
password
```

with your local MySQL credentials.

> Do not commit real database passwords or other secrets to GitHub. Use environment variables for credentials when publishing or deploying the project.

---

### 5. Start the Backend

From the backend directory:

```bash
python -m uvicorn main:app --reload
```

The FastAPI development server will start locally.

---

## 📚 API Documentation

FastAPI automatically generates interactive API documentation.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

Swagger UI allows you to:

* View available API endpoints
* Inspect request schemas
* Send test requests
* View API responses
* Debug backend APIs

---

## 💻 Start the React Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

The React application will then communicate with the FastAPI backend through HTTP API requests.

---

## 🔍 Example Sentiment Prediction

Input:

```json
{
  "review": "The product quality is excellent and I really liked it."
}
```

Possible response:

```json
{
  "review": "The product quality is excellent and I really liked it.",
  "sentiment": "Positive"
}
```

Another example:

```json
{
  "review": "The product is okay but nothing special."
}
```

Possible prediction:

```text
Neutral
```

---

## 🧩 Technologies and Their Roles

| Technology          | Role                                 |
| ------------------- | ------------------------------------ |
| React.js            | User interface                       |
| FastAPI             | Backend REST API                     |
| Pydantic            | Request data validation              |
| SQLAlchemy          | Database ORM                         |
| PyMySQL             | MySQL database driver                |
| MySQL               | Persistent data storage              |
| TF-IDF              | Text-to-numerical feature conversion |
| Linear SVM          | Sentiment classification             |
| Logistic Regression | Alternative ML model evaluated       |
| Scikit-learn        | ML training and evaluation           |
| Joblib              | Saving/loading trained ML artifacts  |
| Uvicorn             | ASGI server for FastAPI              |

---

## 🎯 Key Learning Outcomes

This project demonstrates practical understanding of:

* Full-stack web application development
* REST API development using FastAPI
* Machine Learning model training and evaluation
* Natural Language Processing fundamentals
* TF-IDF feature extraction
* Text classification
* Integration of ML models with web applications
* MySQL database integration
* SQLAlchemy ORM
* React-FastAPI communication
* API testing and documentation
* Model serialization using Joblib

---

## 🔮 Future Improvements

Possible improvements include:

* Improve sentiment classification accuracy
* Experiment with advanced NLP models
* Improve Neutral sentiment detection
* Add JWT-based authentication
* Add review analytics and visualization
* Deploy frontend and backend to cloud platforms
* Containerize the application using Docker
* Add automated model testing
* Add CI/CD using GitHub Actions

---

## 📌 Project Summary

ReviewSense AI demonstrates an end-to-end Machine Learning application where review text is collected through a React interface, processed by a FastAPI backend, transformed using TF-IDF, classified using a trained Machine Learning model, and integrated with a MySQL database for persistent storage.

The project demonstrates how **Machine Learning, backend APIs, databases, and frontend technologies can be integrated into a complete real-world web application**.
