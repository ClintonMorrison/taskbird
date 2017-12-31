__author__ = 'clinton'
from django.core.mail import send_mail

def send_admin_email(title = '', message = ''):
    send_mail(title, message, 'contact@taskbird.ca', ['contact@taskbird.ca'])

