function resizeTextarea(ev) {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + 20 + "px";
}
var te = document.querySelector("textarea");
te.addEventListener("input", resizeTextarea);
let v = setU;
function convertText() {
  try {
    let input = document.querySelector("#inputField");
    let output = document.querySelector("#outputField");
    let copy = document.querySelector("#copy");
    copy.style.display = "inline";
    output.style.display = "inline";
    output.style.width = "90%";
    document
      .querySelector("#outputDiv")
      .setAttribute("style", "background: var(--theme-box-color);");
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    let string = converter(input.value, setU);
    let temp = string.replace(/\\n/g, " <br/> ");
    output.innerHTML = temp;
    v = setU;
    if (input.value.toLowerCase() == "leftrightleftrightba") cube();
  } catch (err) {
    notify(err);
  }
}

function convertTextD() {
  try {
    let input = document.querySelector("#inputField");
    let output = document.querySelector("#outputField");
    let copy = document.querySelector("#copy");
    copy.style.display = "inline";
    output.style.display = "inline";
    output.style.width = "90%";
    document
      .querySelector("#outputDiv")
      .setAttribute("style", "background: var(--theme-box-color);");
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    let string = converter(input.value, setD);
    let temp = string.replace(/\\n/g, " <br/> ");
    output.innerHTML = temp;
    v = setD;
    if (input.value.toLowerCase() == "leftrightleftrightba") cube();
  } catch (err) {
    notify(err);
  }
}

function notify(text) {
  try {
    let o = document.querySelector("#notification");
    o.innerHTML = text;
    o.style.display = "inline";
    setTimeout(() => {
      o.style.display = "none";
    }, 3000);
  } catch (err) {
    console.error(err);
  }
}

function copyTextToClipboard() {
  if (!navigator.clipboard) {
    return;
  }
  try {
    let text = converter(document.querySelector("#inputField").value, v);
    navigator.clipboard
      .writeText(text.replace(/\\n/g, "\u000A"))
      .then(notify("Copying to clipboard was successful!"));
  } catch (err) {
    notify("Could not copy text");
  }
}

function cube() {
  let c = document.getElementById("cube");
  c.style.display = "inline";
}
