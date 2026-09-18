from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, User, Review

from schemas import (
    RegisterSchema,
    LoginSchema,
    SaveReviewSchema
)

import joblib
import re
# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI()

# ==========================================
# CREATE DATABASE TABLES
# ==========================================

Base.metadata.create_all(bind=engine)

# ==========================================
# ENABLE CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# ==========================================
# LOAD ML MODEL
# ==========================================

model = joblib.load("../ml/sentiment_model.pkl")

# ==========================================
# LOAD VECTORIZER
# ==========================================

vectorizer = joblib.load("../ml/vectorizer.pkl")

# ==========================================
# REQUEST BODY
# ==========================================

class ReviewRequest(BaseModel):

    review: str

# ==========================================
# CLEAN TEXT FUNCTION
# ==========================================

def clean_text(text):

    text = text.lower()

    text = re.sub(r"http\S+", "", text)

    text = re.sub(r"[^a-zA-Z\s]", "", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()

# ==========================================
# ROOT API
# ==========================================

@app.get("/")
def home():

    return {
        "message": "ReviewSense-AI Backend Running"
    }

# ==========================================
# SENTIMENT PREDICTION API
# ==========================================

@app.post("/predict")
def predict_sentiment(data: ReviewRequest):

    cleaned_review = clean_text(data.review)

    review_vector = vectorizer.transform([cleaned_review])

    prediction = model.predict(review_vector)

    return {

        "review": data.review,

        "sentiment": prediction[0]
    }

# ==========================================
# REGISTER API
# ==========================================

@app.post("/register")
def register(
    user: RegisterSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        return {
            "message": "Email already exists"
        }

    new_user = User(

        username=user.username,

        email=user.email,

        password=user.password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "User registered successfully",

        "user": {

            "id": new_user.id,

            "username": new_user.username,

            "email": new_user.email
        }
    }

# ==========================================
# LOGIN API
# ==========================================

@app.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(

        User.email == user.email,

        User.password == user.password

    ).first()

    if not existing_user:

        return {
            "message": "Invalid email or password"
        }

    return {

        "message": "Login successful",

        "user": {

            "id": existing_user.id,

            "username": existing_user.username,

            "email": existing_user.email
        }
    }

# ==========================================
# SAVE REVIEW API
# ==========================================

@app.post("/save-review")
def save_review(
    data: SaveReviewSchema,
    db: Session = Depends(get_db)
):

    new_review = Review(

        review_text=data.review_text,

        sentiment=data.sentiment,

        user_id=data.user_id,

        username=data.username
    )

    db.add(new_review)

    db.commit()

    db.refresh(new_review)

    return {

        "message": "Review saved successfully",

        "review": {

            "id": new_review.id,

            "review_text": new_review.review_text,

            "sentiment": new_review.sentiment,

            "username": new_review.username,

            "user_id": new_review.user_id
        }
    }

# ==========================================
# GET USER-SPECIFIC REVIEWS
# ==========================================

@app.get("/reviews/{user_id}")
def get_user_reviews(

    user_id: int,

    db: Session = Depends(get_db)
):

    all_reviews = (

    db.query(Review)

    .filter(Review.user_id == user_id)

    .order_by(Review.id.desc())

    .limit(10)

    .all()
)

    reviews_data = []

    for review in all_reviews:

        reviews_data.append({

            "id": review.id,

            "review_text": review.review_text,

            "sentiment": review.sentiment,

            "username": review.username,

            "user_id": review.user_id
        })

    return reviews_data

# ==========================================
# GET ALL REVIEWS
# ==========================================

@app.get("/reviews")
def get_all_reviews(

    db: Session = Depends(get_db)
):

    all_reviews = db.query(Review).all()

    reviews_data = []

    for review in all_reviews:

        reviews_data.append({

            "id": review.id,

            "review_text": review.review_text,

            "sentiment": review.sentiment,

            "username": review.username,

            "user_id": review.user_id
        })

    return reviews_data