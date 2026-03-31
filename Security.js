let secureElements;
let secureContent;
let unlocked = false;

function setup(){
  const start = new Date();
  secureElements = document.querySelector(".secure");
  secureContent = document.querySelectorAll(".secure-content");
  secureContent.forEach(s => {s.disabled = true;})
  const button = document.createElement("button");
  button.textContent = "Prove I'm not a robot";
  secureElements.prepend(button);
  function handleClick(){
    const end = new Date();
    if(end - start > 500){
      unlocked = true;
      secureContent.forEach(s => {s.disabled = false;});
    }
  }
}
window.onload = setup();
