from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    username = forms.CharField(max_length=254, help_text=None, widget=forms.TextInput(attrs={"placeholder":"username"}))
    email = forms.EmailField(max_length=254, help_text=None, widget=forms.TextInput(attrs={"placeholder":"email"}))
    password1 = forms.CharField(help_text="Must contain at least 8 characters. \n Can't be entirely numeric.",widget=forms.PasswordInput(attrs={"placeholder":"password1"}))
    password2 = forms.CharField(help_text="Enter the same password as before",widget=forms.PasswordInput(attrs={"placeholder":"password2"}))
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2',)


