import { searchDrugs } from './drugDatabase.js';

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const searchBtn = document.getElementById('searchBtn');

  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchInput.focus();
  });

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  searchBtn.addEventListener('click', function() {
    performSearch();
  });

  async function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
      showError('請輸入搜尋關鍵字');
      return;
    }

    // 顯示載入狀態
    showLoading(true);

    try {
      // 搜尋藥物 (現在是async函數)
      const results = await searchDrugs(searchTerm);
      
      if (results.length === 0) {
        showError('找不到相關藥物資訊，請嘗試其他關鍵字');
        showLoading(false);
        return;
      }

      // 保存搜尋結果和關鍵字到本地存儲
      localStorage.setItem('searchResults', JSON.stringify(results));
      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('currentDrugIndex', '0'); // 預設顯示第一個結果
      
      // 跳轉到搜尋結果頁面
      window.location.href = '/html/search_result.html';
      
    } catch (error) {
      console.error('搜尋時發生錯誤：', error);
      showError('搜尋時發生錯誤，請稍後再試');
      showLoading(false);
    }
  }

  function showError(message) {
    // 創建錯誤訊息元素
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

    // 3秒後自動移除錯誤訊息
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 3000);
  }

  function showLoading(show) {
    const existingLoader = document.querySelector('.loading_overlay');
    
    if (show && !existingLoader) {
      const loaderDiv = document.createElement('div');
      loaderDiv.className = 'loading_overlay';
      loaderDiv.innerHTML = '<div class="loading_spinner">搜尋中...</div>';
      loaderDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        font-size: 18px;
        color: white;
      `;

      document.body.appendChild(loaderDiv);
    } else if (!show && existingLoader) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }
});