# serializers.py
from rest_framework import serializers
from .models import PersonalDetail, Movement

class PersonalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalDetail
        fields = ['emp_no', 'firstname', 'lastname']

class MovementSerializer(serializers.ModelSerializer):
    personal_detail = PersonalDetailSerializer(many=True)

    class Meta:
        model = Movement
        fields = ['sors', 'tors', 'personal_detail']

    def create(self, validated_data):
        personal_detail_data = validated_data.pop('personal_detail')
        returnData = []
        for personal_detail in personal_detail_data:
            # print(dict(personal_detail))
            personal_detail_instance = PersonalDetail.objects.create(**personal_detail)
        
            movement_instance = Movement.objects.create(personal_detail=personal_detail_instance, **validated_data)
            print(movement_instance.__dict__)
            returnData.append(movement_instance.personal_detail)
            movement_instance
        print(returnData)
        return movement_instance
