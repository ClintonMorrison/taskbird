__author__ = 'clinton'
from django.core.mail import send_mail
from django.template import loader, Context

def send_admin_email(title = '', message = ''):
    send_mail(title, message, 'contact@taskbird.ca', ['contact@taskbird.ca'])

def send_button_email(email, subject = '', title = '', body = '', buttonText = ''):
    template = loader.get_template('emails/buttonEmail.html')

    context = Context({
        'buttonText': buttonText,
        'title': title,
        'body': body,
        'companyName': 'Task Bird',
        'headerImageLink': 'http://taskbird.ca/taskbird/static/images/emailHeader.png',
        'buttonLink': 'http://taskbird.ca',
        'streetAddress': '1314 Martello Street',
        'province': 'Nova Scotia',
        'city': 'Halifax',
        'postalCode': 'B3H 4S7',
        'unsubscribeLink': 'http://taskbird.ca'
    })

    print template.render(context)

    send_mail(
        subject,
        body,
        'contact@taskbird.ca',
        ['contact@taskbird.ca'],
        html_message=template.render(context)
    )

def send_password_reset_email(email):
    send_button_email(
        email,
        'Task Bird Password Reset',
        'Password Reset',
        ''.join([
            'You received this email because you requested your password to be reset.',
            'Click the below button to reset your password. '
        ]),
        'Reset Password'
    )
