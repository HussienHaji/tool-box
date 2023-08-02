const btn = document.querySelector(".btn")

function generateQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      document.getElementById('quote-text').textContent = data.content;
      document.getElementById('quote-author').textContent = "- " + data.author;
    })
    .catch(error => console.log('Error:', error));
}

btn.addEventListener("click", generateQuote)