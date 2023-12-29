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
        function: iife
      });
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

function iife() {

  function simulateClick(element) {
    var clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    console.log(clickEvent);
    element.dispatchEvent(clickEvent);
  }
  // element = document.querySelectorAll('.d2l-datalist .d2l-link')[0]
  // simulateClick(element);

  async function wait(seconds) {
    return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
    });
  }

  async function download_to_pdf() {
    // console.log("download_to_pdf wait 5 seconds");
    // await wait(5);
    // console.log("download_to_pdf wait 5 seconds done");

    const buttonElement = document.querySelectorAll(".d2l-page-main-padding button")[0];

    if (buttonElement) {
      simulateClick(buttonElement);
    }
  }

  async function list_all_module_content() {
    var list_elements = document.querySelectorAll('.d2l-datalist .d2l-link');
    console.log(`ALL List Elements_B:`, list_elements);

    if (list_elements.length > 0) {
      for (const [index, element] of list_elements.entries()) {
        if (index === 0) {
          continue;
        }
        console.log(`List Element_B ${index + 1}:`, element);
        simulateClick(element);

        console.log("list_all_module_content wait 5 seconds");
        await wait(5);
        console.log("list_all_module_content wait 5 seconds done");

        await download_to_pdf();
      }
    } else {
      console.log("No elements found.");
    }
  }

  async function handleOuterTOC(liElement, index) {
    console.log(`List Element_A ${index + 1}:`, liElement);
    simulateClick(liElement);

    console.log("OUTER TOC wait 5 seconds");
    await wait(5);
    console.log("OUTER TOC wait 5 seconds done");

    await list_all_module_content();

    if (index === 2) {
      return;
    }
  }

  // content.js
  (async () => {
    var liElements = document.querySelectorAll("#D2L_LE_Content_TreeBrowser li .d2l-le-TreeAccordionItem-anchor");
    console.log(liElements)
    if (liElements.length > 0) {
      for (const [index, liElement] of liElements.entries()) {
        if (index === 0) {
          continue;
        }
        await handleOuterTOC(liElement, index);
      }
    } else {
      console.log("No li elements found.");
    }
  })();
}
