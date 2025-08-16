/**
 * 藥物數據服務 - 統一的數據存取層
 * 現在使用Django REST API
 */

// API基礎URL
const API_BASE = 'http://localhost:8001/api';

// 搜尋藥物
export async function searchDrugs(searchTerm) {
  if (!searchTerm?.trim()) return [];
  
  try {
    const response = await fetch(`${API_BASE}/drugs/search/?q=${encodeURIComponent(searchTerm.trim())}`);
    if (!response.ok) throw new Error(`搜尋失敗: ${response.status}`);
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('搜尋藥物失敗：', error);
    throw error;
  }
}

// 根據ID獲取藥物
export async function getDrugById(id) {
  try {
    const response = await fetch(`${API_BASE}/drugs/${id}/`);
    if (!response.ok) throw new Error(`獲取藥物失敗: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('獲取藥物詳情失敗：', error);
    throw error;
  }
}

// 獲取所有藥物
export async function getAllDrugs() {
  try {
    const response = await fetch(`${API_BASE}/drugs/`);
    if (!response.ok) throw new Error(`獲取藥物列表失敗: ${response.status}`);
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('獲取藥物列表失敗：', error);
    throw error;
  }
}

// 更新藥物儲存位置
export async function updateDrugStorage(drugId, storageLocation) {
  try {
    const response = await fetch(`${API_BASE}/drugs/${drugId}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storage_location: storageLocation
      })
    });
    
    if (!response.ok) throw new Error(`更新失敗: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('更新儲存位置失敗：', error);
    throw error;
  }
}