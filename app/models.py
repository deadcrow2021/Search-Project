from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class LoginTable(models.Model):
    course = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(6)], blank=True, null=True)
    department = models.CharField(max_length=300, blank=True, null=True)
    discipline = models.CharField(max_length=300, blank=True, null=True)

    
class LiteratureTable(models.Model):
    literature = models.URLField(max_length=1000, unique=True, blank=True)
    literature_type = models.CharField(max_length=100, blank=True, null=True)
    input_table = models.ForeignKey(LoginTable, related_name='liter', on_delete=models.CASCADE)


class TeacherTable(models.Model):
    teacher = models.CharField(max_length=300, blank=True, null=True)
    literature_table = models.ForeignKey(LiteratureTable, related_name='teacher', on_delete=models.CASCADE)