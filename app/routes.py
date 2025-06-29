# routes.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.utils import send_email


main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/order', methods=['POST'])
def handle_order():
    square = request.form['square']
    service = request.form['service']
    name = request.form['name']
    phone = request.form['phone']

    message = f"""Нова заявка з сайта:
Ім'я: {name}
Телефон: {phone}
Послуга: {service}
Площа: {square} м²"""

    try:
        send_email("Новая заявка", message)
        flash("Заявка успешно отправлена!", "success")
    except Exception as e:
        print(f"Ошибка при отправке: {e}")
        flash("Ошибка при отправке заявки.", "danger")

    return redirect(url_for('main.index'))


@main.route('/services/<service_name>')
def service(service_name):
    try:
        return render_template(f'services/{service_name}.html')
    except:
        return render_template('404.html'), 404
