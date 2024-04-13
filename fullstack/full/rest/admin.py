from django.contrib import admin
from .models import PersonalDetail, Movement

# Register your models here.

class AuthorAdmin(admin.ModelAdmin):
    pass

admin.site.register(PersonalDetail)
admin.site.register(Movement)
