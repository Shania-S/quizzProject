from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres import fields
from django import forms
from django.forms import ModelForm, TextInput, EmailInput

# Create your models here.
# Link to database


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) # one to many relationship ( 1 user can create * categories)
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank = True)

    def __str__(self):
        return self.name

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        exclude = ['user']
        widgets = {
            'name' : TextInput({
                'placeholder' : 'Name',
                'class' : 'formCat'
            }),
            'description' : forms.Textarea({
                'placeholder' : 'Description',
                'class' : 'formCat'
            })
        }

class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    question = models.CharField(max_length=250, blank=False,null=False)
    answer = models.CharField(max_length=200)
    options = fields.ArrayField(models.CharField(max_length=200, blank=False))
    explanation = models.TextField(null = True, blank = True)
    number_wa = models.IntegerField(null = True, blank = True) 
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    point = models.FloatField(null = True, blank = True)

    def __str__(self):
        return self.question
    class Meta:
        ordering = ['-id']

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        exclude = ['number_wa', 'point','category','user']
        widgets = {
            'question' : TextInput({
                'placeholder' : 'Question',
                'id' : 'question',
               
            }),
             'answer' : TextInput({
                'placeholder' : 'Answer',
                 'id' : 'answer',
            }),
             'options' : TextInput({
                'placeholder' : 'Options',
            'readonly': 'readonly',
            'id' : 'optionsArray',
            'style': 'display:none;',
             'id' : 'options',
            }),

            'explanation' : forms.Textarea({
                'placeholder' : 'Explanation',
                 'id' : 'explanation',
            })
        }


class Number_Of_WrongA(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    number_wa = models.FloatField()

    def __str__(self):
        return str(self.question)

