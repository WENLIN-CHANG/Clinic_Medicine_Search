from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import render
from django.http import FileResponse, Http404
from django.conf import settings
from .models import Drug
from .serializers import DrugSerializer, DrugUpdateSerializer
import os


class DrugListView(generics.ListAPIView):
    """獲取所有藥物列表"""
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer


class DrugDetailView(generics.RetrieveAPIView):
    """獲取單一藥物詳情"""
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer


class DrugUpdateView(generics.UpdateAPIView):
    """更新藥物資訊（主要用於儲存位置）"""
    queryset = Drug.objects.all()
    serializer_class = DrugUpdateSerializer


@api_view(['GET'])
def drug_search(request):
    """搜尋藥物API"""
    query = request.GET.get('q', '').strip()
    
    if not query:
        return Response(
            {'error': '請提供搜尋關鍵字'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # 搜尋中文名稱、英文名稱、用法用量
    drugs = Drug.objects.filter(
        Q(name_zh__icontains=query) |
        Q(name_en__icontains=query) |
        Q(dosage__icontains=query)
    )
    
    serializer = DrugSerializer(drugs, many=True)
    return Response({
        'results': serializer.data,
        'count': len(serializer.data)
    })


def home_view(request):
    """首頁視圖"""
    index_path = os.path.join(settings.BASE_DIR, 'index.html')
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'))
    raise Http404("首頁檔案不存在")


def search_result_view(request):
    """搜尋結果頁面視圖"""
    html_path = os.path.join(settings.BASE_DIR, 'html', 'search_result.html')
    if os.path.exists(html_path):
        return FileResponse(open(html_path, 'rb'))
    raise Http404("搜尋結果頁面不存在")


def storage_location_view(request):
    """儲存位置頁面視圖"""
    html_path = os.path.join(settings.BASE_DIR, 'html', 'storage_location.html')
    if os.path.exists(html_path):
        return FileResponse(open(html_path, 'rb'))
    raise Http404("儲存位置頁面不存在")
