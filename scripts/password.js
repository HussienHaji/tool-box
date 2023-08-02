const btnGenerated = document.querySelector("#generate")

function generatePassword(length, useUppercase, useNumbers, useSymbols) {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  let uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numberCharset = "0123456789";
  let symbolCharset = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  if (useUppercase) {
    charset += uppercaseCharset;
  }
  if (useNumbers) {
    charset += numberCharset;
  }
  if (useSymbols) {
    charset += symbolCharset;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function getPassword() {
  const length = document.querySelector("#length").value
  const uppercase = document.querySelector("#uppercase").checked
  const numbers = document.querySelector("#numbers").checked
  const symbols = document.querySelector("#symbols").checked

  const password = generatePassword(length, uppercase, numbers, symbols)

  showPassowrd(password)

}

function showPassowrd(password) {
  document.querySelector(".generated-password").textContent = password
}

btnGenerated.addEventListener("click", getPassword)