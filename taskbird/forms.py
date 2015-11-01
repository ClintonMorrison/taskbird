from django import forms


class LoginForm(forms.Form):
	username = forms.CharField(label='Username', max_length=100)
	password = forms.CharField(label='Password', max_length=100)

class PasswordResetRequestForm(forms.Form):
	email = forms.EmailField(label='email')

class ContactForm(forms.Form):
	name = forms.CharField(label='Name', max_length=100)
	message = forms.CharField(label='Name', max_length=100, required=False)