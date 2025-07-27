# routes.py
from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.utils import send_email
from app.models import Order
from app import db
from flask import session
import os


main = Blueprint('main', __name__)


ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/order', methods=['POST'])
def handle_order():
    try:
        square_ft = float(request.form['square'])
    except (ValueError, KeyError):
        flash("Некоректне значення площі.", "danger")
        return redirect(url_for('main.index'))

    square_m2 = round(square_ft / 10.7639, 2)
    service = request.form.get('service', 'Невідомо')
    name = request.form.get('name', 'Невідомо')
    phone = request.form.get('phone', 'Невідомо')

    order = Order(
        name=name,
        phone=phone,
        service=service,
        square_ft=square_ft,
        square_m2=square_m2
    )
    db.session.add(order)
    db.session.commit()

    message = f"""Нова заявка з сайта:
Ім'я: {name}
Телефон: {phone}
Послуга: {service}
Площа: {square_ft} ft² ({square_m2} м²)"""

    try:
        send_email("Нова заявка", message)
        flash("Заявка успішно надіслана!", "success")
    except Exception as e:
        print(f"Помилка при відправці: {e}")
        flash("Помилка при надсиланні заявки.", "danger")

    return redirect(url_for('main.index'))



@main.route('/services/<service_name>')
def service(service_name):
    try:
        return render_template(f'services/{service_name}.html')
    except:
        return render_template('404.html'), 404


@main.route('/admin/orders')
def view_orders():
    if not session.get('admin'):
        return redirect(url_for('main.admin_login'))

    orders = Order.query.order_by(Order.created_at.desc()).all()
    return render_template('admin_orders.html', orders=orders)


@main.route('/admin/orders/<int:order_id>/toggle', methods=['POST'])
def toggle_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    order.status = 'closed' if order.status == 'open' else 'open'
    db.session.commit()
    return redirect(url_for('main.view_orders'))


@main.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        password = request.form.get('password')
        if password == ADMIN_PASSWORD:
            session['admin'] = True
            return redirect(url_for('main.view_orders'))
        else:
            flash("Невірний пароль", "danger")
            return redirect(url_for('main.admin_login'))

    return render_template('admin_login.html')


@main.route('/admin/logout')
def admin_logout():
    session.pop('admin', None)
    return redirect(url_for('main.index'))


@main.route('/admin/orders/<int:order_id>/delete', methods=['POST'])
def delete_order(order_id):
    if not session.get('admin'):
        return redirect(url_for('main.admin_login'))

    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    flash("Заявку видалено", "success")
    return redirect(url_for('main.view_orders'))
