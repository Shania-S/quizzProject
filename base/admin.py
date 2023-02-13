from django.contrib import admin
from django.contrib.auth.models import User
from .models import *
# Register your models here.

admin.site.register(Category)
admin.site.register(Question)
admin.site.register(Number_Of_WrongA)
