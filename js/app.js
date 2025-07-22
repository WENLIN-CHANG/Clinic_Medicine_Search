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

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      console.log('搜尋：', searchTerm);
      window.location.href = '/html/search_result.html';
    }
  }
});