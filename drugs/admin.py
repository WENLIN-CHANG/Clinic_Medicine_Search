from django.contrib import admin
from .models import Drug


@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    list_display = ['id', 'name_zh', 'name_en', 'storage_location', 'created_at']
    list_filter = ['storage_location', 'created_at']
    search_fields = ['name_zh', 'name_en', 'dosage']
    ordering = ['id']
    
    fieldsets = (
        ('基本資訊', {
            'fields': ('name_zh', 'name_en', 'image')
        }),
        ('用藥資訊', {
            'fields': ('dosage', 'director_dosage', 'side_effects')
        }),
        ('其他資訊', {
            'fields': ('package_insert', 'storage_location')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
