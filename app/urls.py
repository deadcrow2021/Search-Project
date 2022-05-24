from django.urls import path
from . import views

urlpatterns = [
	path('overview/', views.apiOverview, name="api-overview"),
	path('list/', views.taskList, name="list"),
 	path('', views.main_page, name='main-page')
]
