# routes.py
from flask import Blueprint, render_template, request
from .models import db, Order

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/order', methods=['POST'])
def order():
    name = request.form['name']
    phone = request.form['phone']
    service = request.form['service']
    date = request.form['date']
    new_order = Order(name=name, phone=phone, service=service, date=date)
    db.session.add(new_order)
    db.session.commit()
    return 'Спасибо! Мы с вами свяжемся.'

@main.route('/services/<service_name>')
def service(service_name):
    try:
        return render_template(f'services/{service_name}.html')
    except:
        return render_template('404.html'), 404
