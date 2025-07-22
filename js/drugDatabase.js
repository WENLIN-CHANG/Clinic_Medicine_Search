/**
 * 藥物數據服務 - 統一的數據存取層
 */

// 數據快取
let drugCache = null;

// 載入藥物數據
async function loadDrugs() {
  if (drugCache) return drugCache;
  
  try {
    const response = await fetch('/data/drugs.json');
    if (!response.ok) throw new Error(`載入失敗: ${response.status}`);
    
    drugCache = await response.json();
    return drugCache;
  } catch (error) {
    console.error('載入藥物數據失敗：', error);
    return [];
  }
}

// 搜尋藥物
export async function searchDrugs(searchTerm) {
  const drugs = await loadDrugs();
  if (!searchTerm?.trim()) return [];
  
  const term = searchTerm.toLowerCase().trim();
  return drugs.filter(drug => 
    drug.name_zh.includes(term) || 
    drug.name_en.toLowerCase().includes(term) ||
    drug.dosage.includes(term)
  );
}

// 根據ID獲取藥物
export async function getDrugById(id) {
  const drugs = await loadDrugs();
  return drugs.find(drug => drug.id === parseInt(id));
}

// 獲取所有藥物
export async function getAllDrugs() {
  return await loadDrugs();
}

// 更新藥物儲存位置
export async function updateDrugStorage(drugId, storageLocation) {
  const drugs = await loadDrugs();
  const drug = drugs.find(d => d.id === parseInt(drugId));
  
  if (drug) {
    drug.storage_location = storageLocation;
    return true;
  }
  return false;
}