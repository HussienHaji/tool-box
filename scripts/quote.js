const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote");

async function getRandomQuote() {
  const response = await fetch("https://type.fit/api/quotes");
  const data = await response.json();
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

function setQuote() {
  getRandomQuote().then(data => {
    quoteText.textContent = data.text;
    quoteAuthor.textContent = "- " + data.author;
  });
}

newQuoteButton.addEventListener("click", setQuote);

setQuote();