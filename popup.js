// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const baseFolderInput = document.getElementById('baseFolderInput');
  const selectedFolderInfo = document.getElementById('selectedFolderInfo');
  const listLiElementsButton = document.getElementById('listLiElementsButton');

  baseFolderInput.addEventListener('change', updateSelectedFolderInfo);

  listLiElementsButton.addEventListener('click', function () {
    getCurrentTab().then((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: listLiElementsFunction
      });
    });
  });

  function updateSelectedFolderInfo() {
    const selectedFolder = baseFolderInput.files[0];
    selectedFolderInfo.textContent = selectedFolder ? `Selected Folder: ${selectedFolder.path}` : 'No folder selected';
  }

  function getCurrentTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    });
  }
});

function listLiElementsFunction() {
  var liElements = document.querySelectorAll("#D2L_LE_Content_TreeBrowser li");
  liElements.forEach((li, index) => {
    console.log(`List Element ${index + 1}:`, li);
  });
}
