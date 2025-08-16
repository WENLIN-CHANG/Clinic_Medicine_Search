import { updateDrugStorage } from './drugDatabase.js';

document.addEventListener('DOMContentLoaded', function() {
  const returnBtn = document.getElementById('returnBtn');
  const cabinetCells = document.querySelectorAll('.cabinet-cell');
  
  // 從localStorage獲取當前藥物資訊
  const currentDrugId = localStorage.getItem('currentDrugId');
  
  // 返回按鈕功能
  returnBtn.addEventListener('click', function() {
    window.location.href = '/html/search_result.html';
  });
  
  // 儲位點擊功能
  cabinetCells.forEach(cell => {
    cell.addEventListener('click', async function() {
      const location = this.dataset.location;
      console.log('點擊儲位：', location);
      
      // 點擊反饋動畫
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // 如果有藥物ID，則更新儲存位置
      if (currentDrugId) {
        try {
          // 顯示載入狀態
          this.style.backgroundColor = '#ffeb3b';
          this.textContent = '更新中...';
          
          // 呼叫API更新儲存位置
          await updateDrugStorage(currentDrugId, location);
          
          // 更新成功反饋
          this.style.backgroundColor = '#4caf50';
          this.style.color = 'white';
          this.textContent = '已選取';
          
          // 更新localStorage中的資料
          const searchResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
          const currentIndex = parseInt(localStorage.getItem('currentDrugIndex') || '0');
          if (searchResults[currentIndex]) {
            searchResults[currentIndex].storage_location = location;
            localStorage.setItem('searchResults', JSON.stringify(searchResults));
          }
          
          // 2秒後返回搜尋結果頁面
          setTimeout(() => {
            window.location.href = '/html/search_result.html';
          }, 2000);
          
        } catch (error) {
          console.error('更新儲存位置失敗:', error);
          
          // 錯誤反饋
          this.style.backgroundColor = '#f44336';
          this.style.color = 'white';
          this.textContent = '更新失敗';
          
          // 3秒後恢復原狀
          setTimeout(() => {
            this.style.backgroundColor = '';
            this.style.color = '';
            this.textContent = location;
          }, 3000);
        }
      } else {
        console.warn('沒有找到當前藥物ID');
      }
    });
  });
});