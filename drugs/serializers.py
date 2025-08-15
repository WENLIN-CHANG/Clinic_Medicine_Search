from rest_framework import serializers
from .models import Drug


class DrugSerializer(serializers.ModelSerializer):
    """藥物序列化器"""
    
    class Meta:
        model = Drug
        fields = [
            'id',
            'name_zh', 
            'name_en',
            'image',
            'dosage',
            'side_effects',
            'package_insert',
            'director_dosage',
            'storage_location',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DrugUpdateSerializer(serializers.ModelSerializer):
    """藥物更新序列化器（僅允許更新特定欄位）"""
    
    class Meta:
        model = Drug
        fields = ['storage_location']