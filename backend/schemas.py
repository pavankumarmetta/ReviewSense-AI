from pydantic import BaseModel


# REGISTER SCHEMA

class RegisterSchema(BaseModel):

    username: str

    email: str

    password: str


# LOGIN SCHEMA

class LoginSchema(BaseModel):

    email: str

    password: str


# SAVE REVIEW SCHEMA

class SaveReviewSchema(BaseModel):

    review_text: str

    sentiment: str

    user_id: int

    username: str