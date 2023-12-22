// // content.js
// // Select the <ul> element by its id
// var ulElement = document.getElementById("D2L_LE_Content_TreeBrowser");

// // Check if the <ul> element exists
// if (ulElement) {
//   // Get all <li> elements under the <ul>
//   var liElements = ulElement.querySelectorAll("li");

//   // Print the list of <li> elements to the console
//   liElements.forEach(function (li, index) {
//     console.log("List Element " + (index + 1) + ":", li);
//   });
// } else {
//   console.log("UL element not found.");
// }

// content.js
// Function to list LI elements
function listLiElements() {
  // Get all LI elements and log them to the console
  var liElements = document.querySelectorAll("#D2L_LE_Content_TreeBrowser li");
  liElements.forEach(function (li, index) {
    console.log("List Element " + (index + 1) + ":", li);
  });
}

// Call the function when the content script is executed
// listLiElements();
