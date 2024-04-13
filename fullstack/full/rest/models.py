from django.db import models

# Create your models here.
class PersonalDetail(models.Model):
  id= models.AutoField(primary_key=True)
  emp_no = models.IntegerField(db_index=True)
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)

# # Create your models here.
class Movement(models.Model):
  id = models.AutoField(primary_key=True)
  sors = models.DateTimeField(null=True, blank=True)
  tors = models.DateTimeField(null=True, blank=True)
  personal_detail=models.ForeignKey(PersonalDetail, on_delete = models.CASCADE)