from rest_framework import serializers
from .models import LiteratureTable, LoginTable, TeacherTable


class TeacherSerializer(serializers.ModelSerializer):
	class Meta:
			model = TeacherTable
			fields = ['teacher']
   

class LiteratureSerializer(serializers.ModelSerializer):
	teacher = TeacherSerializer(many=True, read_only=True)
	class Meta:
		model = LiteratureTable
		fields = ['literature', 'literature_type', 'teacher']


class LoginSerializer(serializers.ModelSerializer):
	liter = LiteratureSerializer(many=True, read_only=True)
	class Meta:
		model = LoginTable
		fields = ['id', 'course', 'department', 'discipline', 'liter']