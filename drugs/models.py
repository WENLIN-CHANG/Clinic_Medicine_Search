from django.db import models
import json


class Drug(models.Model):
    """藥物模型"""
    
    name_zh = models.CharField(max_length=100, verbose_name="中文名稱")
    name_en = models.CharField(max_length=100, verbose_name="英文名稱")
    image = models.CharField(max_length=255, verbose_name="圖片路徑", blank=True, null=True)
    dosage = models.TextField(verbose_name="用法用量")
    side_effects = models.JSONField(verbose_name="副作用", default=list)
    package_insert = models.URLField(verbose_name="仿單連結", blank=True, null=True)
    director_dosage = models.TextField(verbose_name="院長建議劑量", blank=True, null=True)
    storage_location = models.CharField(max_length=50, verbose_name="儲存位置", blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="建立時間")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新時間")
    
    class Meta:
        verbose_name = "藥物"
        verbose_name_plural = "藥物"
        ordering = ['id']
    
    def __str__(self):
        return f"{self.name_zh} ({self.name_en})"
    
    def get_side_effects_text(self):
        """取得副作用文字（用於顯示）"""
        if isinstance(self.side_effects, list):
            return '\n'.join(self.side_effects)
        return self.side_effects
