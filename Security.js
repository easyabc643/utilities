let secureElements;
let unlocked = false;

function setup() {
  const start = new Date();

  // Query all elements with class 'secure-content'
  secureElements = document.querySelectorAll(".secure-content");

  // Disable them by default
  secureElements.forEach(s => { s.disabled = true; s.hidden = true;});

  const secureDiv = document.querySelector(".secure");
  
  // Create the button
  const button = document.createElement("button");
  button.textContent = "Prove I'm not a robot";

  // When button clicked, check the time elapsed and enable elements
  button.onclick = function() {
    const end = new Date();
    if (end - start > 500) {
      unlocked = true;
      secureElements.forEach(s => { s.disabled = false; s.hidden = false; });
      button.disabled = true;
      button.textContent = "Verified";
      secureDiv.remove(button);
    } else {
      window.close()
    }
  };

  // Append the button to the secure div
  secureDiv.appendChild(button);
}

window.onload = setup;
