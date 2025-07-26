let glossary = {};

// Load the car terms glossary
fetch('car_terms.json')
  .then(res => res.json())
  .then(data => glossary = data);

function translate() {
  const input = document.getElementById('userInput').value.toLowerCase().trim();
  const chatbox = document.getElementById('chatbox');

  if (!input) return;

  // Add user message
  chatbox.innerHTML += `<div class="user">${input}</div>`;

  // Determine bot response
  const response = glossary[input]
    ? glossary[input]
    : "Sorry, I don't know that one yet.";

  // Add bot message
  chatbox.innerHTML += `<div class="bot">${response}</div>`;

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;

  // Clear input field
  document.getElementById('userInput').value = '';
}