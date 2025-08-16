import pytest
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Drug
import json


class DrugModelTest(TestCase):
    """藥物模型測試"""
    
    def setUp(self):
        self.drug = Drug.objects.create(
            name_zh="測試藥物",
            name_en="Test Drug",
            dosage="100mg 每日一次",
            side_effects=["頭暈", "噁心"],
            director_dosage="院長建議100mg"
        )
    
    def test_drug_creation(self):
        """測試藥物建立"""
        self.assertEqual(self.drug.name_zh, "測試藥物")
        self.assertEqual(self.drug.name_en, "Test Drug")
        self.assertEqual(self.drug.side_effects, ["頭暈", "噁心"])
    
    def test_drug_str_method(self):
        """測試藥物字符串表示"""
        expected = "測試藥物 (Test Drug)"
        self.assertEqual(str(self.drug), expected)
    
    def test_get_side_effects_text(self):
        """測試副作用文字方法"""
        expected = "頭暈\n噁心"
        self.assertEqual(self.drug.get_side_effects_text(), expected)


class DrugAPITest(APITestCase):
    """藥物API測試"""
    
    def setUp(self):
        self.drug1 = Drug.objects.create(
            name_zh="普拿疼",
            name_en="Panadol",
            dosage="500mg 每日3次",
            side_effects=["頭痛", "噁心"]
        )
        self.drug2 = Drug.objects.create(
            name_zh="阿斯匹靈",
            name_en="Aspirin",
            dosage="100mg 每日1次",
            side_effects=["胃痛"]
        )
    
    def test_drug_list_api(self):
        """測試藥物列表API"""
        url = reverse('drug-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
    
    def test_drug_detail_api(self):
        """測試藥物詳情API"""
        url = reverse('drug-detail', kwargs={'pk': self.drug1.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name_zh'], "普拿疼")
    
    def test_drug_search_api(self):
        """測試藥物搜尋API"""
        url = reverse('drug-search')
        
        # 搜尋中文名稱
        response = self.client.get(url, {'q': '普拿疼'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['name_zh'], "普拿疼")
        
        # 搜尋英文名稱
        response = self.client.get(url, {'q': 'aspirin'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        
        # 空搜尋
        response = self.client.get(url, {'q': ''})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_drug_update_api(self):
        """測試藥物更新API"""
        url = reverse('drug-update', kwargs={'pk': self.drug1.pk})
        data = {'storage_location': 'L1'}
        
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 驗證更新
        self.drug1.refresh_from_db()
        self.assertEqual(self.drug1.storage_location, 'L1')


@pytest.mark.django_db
class TestDrugImportCommand:
    """測試藥物匯入命令"""
    
    def test_import_command_exists(self):
        """測試匯入命令是否存在"""
        from django.core.management import get_commands
        commands = get_commands()
        assert 'import_drugs' in commands
