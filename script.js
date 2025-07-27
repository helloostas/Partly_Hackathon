// 1. Glossary Declaration (empty object to start)
let glossary = {};

// 2. Load Glossary Data with Error Handling
fetch('car_terms.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    glossary = data;
    console.log('Glossary successfully loaded:', Object.keys(glossary));
  })
  .catch(error => {
    console.error('Error loading glossary:', error);
    alert('Failed to load car terms. Please check console for details.');
  });

// 3. Translation Function with Improved Matching
function translate() {
  // Get and clean user input
  const input = document.getElementById('userInput').value.trim().toLowerCase();
  const chatbox = document.getElementById('chatbox');

  if (!input) return; // Exit if empty input

  // Add user message to chat
  chatbox.innerHTML += `<div class="user">${input}</div>`;

  // Check for matches (exact or partial)
  let response = "Sorry, I don't know that one yet.";
  
  // First try exact match
  if (glossary[input]) {
    response = glossary[input];
  }
  // Then try flexible matching
  else {
    const normalizedInput = input.replace(/\s+/g, ' ');
    const foundKey = Object.keys(glossary).find(key => 
      key.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
    );
    if (foundKey) {
      response = glossary[foundKey];
    }
  }

  // Add bot response
  chatbox.innerHTML += `<div class="bot">${response}</div>`;
  
  // Reset UI
  chatbox.scrollTop = chatbox.scrollHeight;
  document.getElementById('userInput').value = '';
}

// 4. Event Listener (MUST be at bottom)
document.getElementById("translateBtn").addEventListener("click", translate);