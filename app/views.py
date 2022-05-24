from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import LoginSerializer

from .models import LoginTable

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/list/',
		}
	return Response(api_urls)


@api_view(['GET'])
def taskList(request):
	table = LoginTable.objects.all()
	serializer = LoginSerializer(table, many=True)
	return Response(serializer.data)

def main_page(request):
    return render(request, 'app/index.html')
