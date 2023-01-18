from django.urls import path
from . import views

urlpatterns = [ 
    path('', views.index, name='index'),
    path('categories/', views.categoryPage, name='categories'),
    path('category/<int:pk>/', views.startQuiz, name='start-quiz'),
    path('categories/deleteCategory/<int:pk>', views.deleteCategory, name='delete-category'),
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name="logout"),
    path('signup/', views.signupPage, name='signup'),
    path('wrongAnswer', views.wrongAnswer, name='wrongAnswer'),
    path('final_result.html/', views.resultsPage , name='result'),
]