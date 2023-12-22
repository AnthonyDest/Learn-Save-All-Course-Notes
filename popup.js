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


function simulateClick(element) {
  var clickEvent = new Event('click', {
    bubbles: true,
    cancelable: true,
    composed: true
  });
  element.dispatchEvent(clickEvent);
}

function list_all_module_content() {

  var list_elements = document.querySelectorAll('.d2l-datalist .d2l-link')


  if (list_elements.length > 0) {
    // Iterate over each li element
    list_elements.forEach((element, index) => {
      // Perform actions on each li element
      console.log(`List Element_B ${index + 1}:`, element);
      // element.click();
      simulateClick(element);

      download_to_pdf()

      // needs a wait here to ensure previous stuff has time to load

    });
  } else {
    console.log("No elements found.");
  }
}


// content.js
function listLiElementsFunction() {
  // Select all <li> elements under #D2L_LE_Content_TreeBrowser
  // aka outer list TOC navigation elements
  var liElements = document.querySelectorAll("#D2L_LE_Content_TreeBrowser li .d2l-le-TreeAccordionItem-anchor");

  // Check if there are any li elements
  if (liElements.length > 0) {
    // Iterate over each li element
    liElements.forEach((liElement, index) => {
      // Perform actions on each li element
      console.log(`List Element_A ${index + 1}:`, liElement);
      // liElement.click();
      simulateClick(liElement);

      list_all_module_content();

      if (index === 2) {
        return; // Stop the program execution
      }

      // needs a wait here to ensure previous stuff has time to load
    });
  } else {
    console.log("No li elements found.");
  }
}




function download_to_pdf() {

  document.querySelectorAll(".d2l-page-main-padding button")[0].click()

}

