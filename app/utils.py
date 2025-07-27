# utils.py
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

EMAIL_TO_SEND = os.getenv("EMAIL_TO_SEND")
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")


def send_email(subject, message):
    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = EMAIL
    msg["To"] = EMAIL_TO_SEND

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL, PASSWORD)
        server.send_message(msg)