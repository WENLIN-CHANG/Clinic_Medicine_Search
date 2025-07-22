document.addEventListener('DOMContentLoaded', function() {
  const returnBtn = document.getElementById('returnBtn');
  const sideEffectsToggle = document.getElementById('sideEffectsToggle');
  const sideEffects = document.getElementById('sideEffects');
  const storageLocationBtn = document.getElementById('storageLocationBtn');
  
  returnBtn.addEventListener('click', function() {
    window.location.href = '../html/index.html';
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
    window.location.href = '../html/storage_location.html';
  });
});