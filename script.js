<<<<<<< HEAD
import terms from './car_terms.json' assert { type: 'json' };
let glossary = terms;
=======
let glossary = {};
>>>>>>> parent of d85dafe (Update script.js)

// Load the car terms glossary
fetch('car_terms.json')
  .then(res => res.json())
  .then(data => glossary = data)
  .catch(err => console.error("Failed to load glossary:", err));  // Added error handling

function translate() {
  const input = document.getElementById('userInput').value.trim().toLowerCase();
  const chatbox = document.getElementById('chatbox');

  if (!input) return;

  // Add user message
  chatbox.innerHTML += `<div class="user">${input}</div>`;

  // IMPROVED TERM MATCHING - ADD THIS SECTION:
  // Normalize input and search for matching terms
  const normalizedInput = input.replace(/\s+/g, ' ');  // Fix extra spaces
  let response = "Sorry, I don't know that one yet.";
  
  // Check for exact match first
  if (glossary[normalizedInput]) {
    response = glossary[normalizedInput];
  } 
  // If no exact match, check for partial matches
  else {
    const possibleTerms = Object.keys(glossary).filter(term => 
      term.toLowerCase().includes(normalizedInput) || 
      normalizedInput.includes(term.toLowerCase())
    );
    
    if (possibleTerms.length > 0) {
      response = `Did you mean one of these?<br>` +
                possibleTerms.map(term => 
                  `<b>${term}</b>: ${glossary[term]}`
                ).join('<br>');
    }
  }

  // Add bot message
  chatbox.innerHTML += `<div class="bot">${response}</div>`;

  // Scroll to bottom
  chatbox.scrollTop = chatbox.scrollHeight;

  // Clear input field
  document.getElementById('userInput').value = '';
}

// Event listener stays at the bottom
document.getElementById("translateBtn").addEventListener("click", translate);