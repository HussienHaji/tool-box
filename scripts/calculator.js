const display = document.querySelector(".display");
const btns = document.querySelectorAll("button");
const specialChars = ["+", "-", "*", "/", "%", "="];
let result = "";

function claculat(btnValue) {

  if (btnValue === "=" && btnValue !== "") {
    result = eval(result.replace("%", "/100"));
  } else if (btnValue === "AC") {
    result = "";
  } else if (btnValue === "DEL") {
    result = result.toString().slice(0, -1);
  } else {
    if ((result === "" && specialChars.includes(btnValue))) return;
    result += btnValue;
  }
  display.textContent = result;
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => claculat(btn.dataset.value));
});
