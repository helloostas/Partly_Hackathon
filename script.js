let glossary = {};

// Load glossary from the JSON file
fetch('car_terms.json')
  .then(res => res.json())
  .then(data => glossary = data);

function translate() {
  const input = document.getElementById('userInput').value.toLowerCase().trim();
  const chatbox = document.getElementById('chatbox');

  // Add user's message
  chatbox.innerHTML += `<div class="user"><strong>You:</strong> ${input}</div>`;

  // Check for translation
  const explanation = glossary[input];
  if (explanation) {
    chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> ${explanation}</div>`;
  } else {
    chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> Sorry, I don’t know that one yet.</div>`;
  }

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;

  // Clear input
  document.getElementById('userInput').value = '';
}