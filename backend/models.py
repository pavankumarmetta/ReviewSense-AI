from sqlalchemy import Column, Integer, String, Text, ForeignKey

from database import Base


# USER TABLE

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100))

    email = Column(String(100), unique=True)

    password = Column(String(255))


# REVIEW TABLE

class Review(Base):

    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    review_text = Column(Text)

    sentiment = Column(String(50))

    user_id = Column(Integer, ForeignKey("users.id"))

    username = Column(String(100))