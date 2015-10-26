__author__ = 'clinton'
from django.core.mail import send_mail
from django.template import loader, Context

def send_admin_email(title = '', message = ''):
    send_mail(title, message, 'contact@taskbird.ca', ['contact@taskbird.ca'])

def send_button_email(email, subject = '', title = '', body = '', button_text = '', button_link = ''):
    template = loader.get_template('emails/buttonEmail.html')

    context = Context({
        'buttonText': button_text,
        'title': title,
        'body': body,
        'companyName': 'Task Bird',
        'headerImageLink': 'http://taskbird.ca/taskbird/static/images/emailHeader.png',
        'buttonLink': 'http://taskbird.ca',
        'streetAddress': '1314 Martello Street',
        'province': 'Nova Scotia',
        'city': 'Halifax',
        'postalCode': 'B3H 4S7',
        'unsubscribeLink': button_link
    })

    send_mail(
        subject,
        body,
        'contact@taskbird.ca',
        ['contact@taskbird.ca'],
        html_message=template.render(context)
    )

def send_password_reset_email(email, reset_link):
    send_button_email(
        email,
        'Task Bird Password Reset',
        'Password Reset',
        ' '.join([
            'You received this email because you requested your password to be reset.',
            'Click the below button to reset your password. '
        ]),
        'Reset Password',
        reset_link
    )

def send_verify_email(email, verify_link):
    send_button_email(
        email,
        'Task Bird Email Verification',
        'Welcome!',
        ' '.join([
            'Thank you for signing up for Task Bird!',
            'Before you get started we just need to you verify this is your email address. '
        ]),
        'Verify Email',
        verify_link
    )