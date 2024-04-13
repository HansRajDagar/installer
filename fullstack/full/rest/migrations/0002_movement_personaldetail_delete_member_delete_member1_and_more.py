# Generated by Django 4.2.7 on 2024-02-01 18:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rest', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movement',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
                ('sors', models.DateTimeField(blank=True, null=True)),
                ('tors', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PersonalDetail',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('emp_no', models.IntegerField(db_index=True)),
                ('firstname', models.CharField(max_length=255)),
                ('lastname', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='Member',
        ),
        migrations.DeleteModel(
            name='Member1',
        ),
        migrations.AddField(
            model_name='movement',
            name='personal_detail',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest.personaldetail'),
        ),
    ]