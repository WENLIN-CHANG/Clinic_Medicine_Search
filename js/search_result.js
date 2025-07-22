import { getDrugById } from './drugDatabase.js';

document.addEventListener('DOMContentLoaded', function() {
  const returnBtn = document.getElementById('returnBtn');
  const sideEffectsToggle = document.getElementById('sideEffectsToggle');
  const sideEffects = document.getElementById('sideEffects');
  const storageLocationBtn = document.getElementById('storageLocationBtn');
  
  // 載入並顯示搜尋結果
  loadSearchResults();
  
  returnBtn.addEventListener('click', function() {
    window.location.href = '/index.html';
  });
  
  sideEffectsToggle.addEventListener('click', function() {
    if (sideEffects.style.display === 'none') {
      sideEffects.style.display = 'block';
      sideEffectsToggle.textContent = '收合 ▲';
    } else {
      sideEffects.style.display = 'none';
      sideEffectsToggle.textContent = '展開 ▼';
    }
  });
  
  storageLocationBtn.addEventListener('click', function() {
    window.location.href = '/html/storage_location.html';
  });

  function loadSearchResults() {
    try {
      const searchResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
      const currentDrugIndex = parseInt(localStorage.getItem('currentDrugIndex') || '0');
      const searchTerm = localStorage.getItem('searchTerm') || '';
      
      if (searchResults.length === 0) {
        showError('沒有搜尋結果，正在返回首頁...');
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 2000);
        return;
      }

      // 顯示當前藥物資訊
      const currentDrug = searchResults[currentDrugIndex];
      if (currentDrug) {
        displayDrugInfo(currentDrug);
        createNavigationControls(searchResults, currentDrugIndex, searchTerm);
      }
      
    } catch (error) {
      console.error('載入搜尋結果時發生錯誤：', error);
      showError('載入資料時發生錯誤');
    }
  }

  function displayDrugInfo(drug) {
    // 更新藥品圖片
    const drugImage = document.getElementById('drugImage');
    if (drugImage) {
      drugImage.src = drug.image || '';
      drugImage.alt = drug.name_zh + ' 藥品圖片';
    }

    // 更新藥品名稱
    const drugNameZh = document.querySelector('.drug_name_zh');
    const drugNameEn = document.querySelector('.drug_name_en');
    if (drugNameZh) drugNameZh.textContent = drug.name_zh;
    if (drugNameEn) drugNameEn.textContent = drug.name_en;

    // 更新常用劑量
    const commonDosage = document.querySelector('.common_dosage');
    if (commonDosage) commonDosage.textContent = drug.dosage;

    // 更新副作用
    const sideEffectsContainer = document.getElementById('sideEffects');
    if (sideEffectsContainer && drug.side_effects) {
      sideEffectsContainer.innerHTML = '';
      drug.side_effects.forEach(effect => {
        const p = document.createElement('p');
        p.textContent = effect;
        sideEffectsContainer.appendChild(p);
      });
    }

    // 更新仿單連結
    const packageLink = document.querySelector('.package_link');
    if (packageLink) {
      packageLink.href = drug.package_insert || '#';
      packageLink.textContent = drug.package_insert ? '開啟仿單 (新視窗)' : '仿單連結暫無';
    }

    // 更新院長建議劑量
    const directorDosage = document.querySelector('.director_dosage');
    if (directorDosage) directorDosage.textContent = drug.director_dosage;

    // 更新儲存位置按鈕狀態
    updateStorageButton(drug);
  }

  function createNavigationControls(searchResults, currentIndex, searchTerm) {
    // 如果有多個搜尋結果，創建導航控制
    if (searchResults.length > 1) {
      const existingNav = document.querySelector('.navigation_controls');
      if (!existingNav) {
        const navContainer = document.createElement('div');
        navContainer.className = 'navigation_controls';
        navContainer.style.cssText = `
          text-align: center;
          margin: 20px 0;
          padding: 15px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        `;

        const info = document.createElement('p');
        info.textContent = `搜尋"${searchTerm}"找到 ${searchResults.length} 個結果`;
        info.style.cssText = `
          margin: 0 0 10px 0;
          font-weight: bold;
          color: #333;
        `;

        const controls = document.createElement('div');
        controls.style.cssText = 'display: flex; justify-content: center; gap: 10px; align-items: center;';

        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← 上一個';
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.cssText = `
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background-color: ${currentIndex === 0 ? '#ccc' : '#4285f4'};
          color: white;
          cursor: ${currentIndex === 0 ? 'not-allowed' : 'pointer'};
        `;

        const currentInfo = document.createElement('span');
        currentInfo.textContent = `${currentIndex + 1} / ${searchResults.length}`;
        currentInfo.style.cssText = `
          margin: 0 15px;
          font-weight: bold;
          color: #666;
        `;

        const nextBtn = document.createElement('button');
        nextBtn.textContent = '下一個 →';
        nextBtn.disabled = currentIndex === searchResults.length - 1;
        nextBtn.style.cssText = `
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background-color: ${currentIndex === searchResults.length - 1 ? '#ccc' : '#4285f4'};
          color: white;
          cursor: ${currentIndex === searchResults.length - 1 ? 'not-allowed' : 'pointer'};
        `;

        prevBtn.addEventListener('click', () => navigateTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => navigateTo(currentIndex + 1));

        controls.appendChild(prevBtn);
        controls.appendChild(currentInfo);
        controls.appendChild(nextBtn);

        navContainer.appendChild(info);
        navContainer.appendChild(controls);

        // 插入到搜尋結果區域上方
        const searchResultsSection = document.querySelector('.search_results');
        if (searchResultsSection) {
          searchResultsSection.parentNode.insertBefore(navContainer, searchResultsSection);
        }
      }
    }
  }

  function navigateTo(newIndex) {
    localStorage.setItem('currentDrugIndex', newIndex.toString());
    location.reload(); // 重新載入頁面以顯示新的藥物資訊
  }

  function updateStorageButton(drug) {
    if (drug.storage_location) {
      storageLocationBtn.innerHTML = `已儲存至: ${drug.storage_location}`;
      storageLocationBtn.style.backgroundColor = '#4CAF50';
    } else {
      storageLocationBtn.innerHTML = '儲存位置';
      storageLocationBtn.style.backgroundColor = '#ff9800';
    }
  }

  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error_message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 0, 0, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 3000);
  }
});