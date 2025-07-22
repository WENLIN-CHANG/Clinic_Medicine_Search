document.addEventListener('DOMContentLoaded', function() {
  const returnBtn = document.getElementById('returnBtn');
  const cabinetCells = document.querySelectorAll('.cabinet-cell');
  
  // 返回按鈕功能
  returnBtn.addEventListener('click', function() {
    window.location.href = '/html/search_result.html';
  });
  
  // 儲位點擊功能
  cabinetCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const location = this.dataset.location;
      console.log('點擊儲位：', location);
      
      // 簡單的點擊反饋
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});