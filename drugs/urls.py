from django.urls import path
from . import views

urlpatterns = [
    # 前端頁面
    path('', views.home_view, name='home'),
    path('html/search_result.html', views.search_result_view, name='search-result'),
    path('html/storage_location.html', views.storage_location_view, name='storage-location'),
    
    # API端點
    path('api/drugs/', views.DrugListView.as_view(), name='drug-list'),
    path('api/drugs/<int:pk>/', views.DrugDetailView.as_view(), name='drug-detail'),
    path('api/drugs/<int:pk>/update/', views.DrugUpdateView.as_view(), name='drug-update'),
    path('api/drugs/search/', views.drug_search, name='drug-search'),
]