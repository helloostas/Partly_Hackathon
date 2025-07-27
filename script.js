// HARDCODED GLOSSARY SOLUTION (No JSON file needed)
const glossary = {
  "spark plug": {
    description: "A part that produces a spark to ignite fuel in the engine and start combustion.",
    note: "Easy and cheap to replace. Often a DIY job under $20."
  },
  "cv joint": {
    description: "A joint in your axle that helps your wheels turn smoothly while driving.",
    note: "Moderately expensive. Labor-intensive, requires a mechanic."
  },
  "alternator": {
    description: "Charges your battery and powers electrical systems while the engine runs.",
    note: "Expensive ($300+). Requires a skilled mechanic to replace."
  },
  "oil pan gasket": {
    description: "A rubber seal that prevents engine oil from leaking out of the oil pan.",
    note: "Medium difficulty. Labor cost is high even if the part is cheap."
  },
  "timing belt": {
    description: "A belt that synchronizes the engine’s camshaft and crankshaft.",
    note: "Very expensive and time-consuming. Can cost $500+ with labor."
  },
  "brake pad": {
    description: "Pads that press against the brake disc to slow or stop your car.",
    note: "Relatively affordable and quick to replace. DIY possible."
  },
  "radiator": {
    description: "A part that helps cool down the engine and prevents it from overheating.",
    note: "Expensive part, medium-hard job. Can be $400–$900 total."
  },
  "fuel injector": {
    description: "Sprays fuel into the engine in fine mist so it can combust.",
    note: "Difficult to replace and costly if several need replacement."
  },
  "air filter": {
    description: "A filter that keeps dust and debris out of the engine.",
    note: "Very cheap and easy. Anyone can do it in 5 minutes."
  },
  "check engine light": {
    description: "A warning light on your dashboard indicating something’s wrong.",
    note: "Diagnosis varies. Might cost nothing or several hundred dollars."
  },
  "muffler": {
    description: "Part of the exhaust system that reduces engine noise.",
    note: "Moderately priced. Some cars allow for DIY replacement."
  },
  "engine control unit": {
    description: "The car’s onboard computer that controls engine performance.",
    note: "Very expensive. Only trained professionals should handle it."
  },
  "oxygen sensor": {
    description: "Measures oxygen in exhaust gases to optimize fuel efficiency.",
    note: "Affordable part, but tricky to reach in some models."
  },
  "transmission": {
    description: "Changes gears to help your car move at different speeds.",
    note: "One of the most expensive parts to replace. Avoid damage!"
  },
  "battery": {
    description: "Provides the electrical power to start your car and run electronics.",
    note: "Easy to replace. Costs vary between $100–$300."
  },
  "headlight bulb": {
    description: "Lights on the front of your car that help you see at night.",
    note: "Usually easy to replace. Cheap part ($10–$50)."
  },
  "windshield wipers": {
    description: "Keeps your windshield clear of rain and debris.",
    note: "Inexpensive and super easy to replace in minutes."
  },
  "water pump": {
    description: "Circulates coolant through your engine to keep it from overheating.",
    note: "Labor-intensive and expensive. Often replaced with timing belt."
  },
  "drive belt": {
    description: "Transfers power from engine to components like AC and alternator.",
    note: "Medium difficulty. Can be done DIY but requires tensioning."
  },
  "catalytic converter": {
    description: "Reduces harmful emissions by converting exhaust gases.",
    note: "Very expensive (often $1,000+). Also frequently stolen."
  }
};

const fileAliases = {
  "wheel": "brake pad",
  "brake_pad": "brake pad",
  "radiator": "radiator",
  "engine": "engine control unit",
  "cvjoint": "cv joint",
  "cv_joint": "cv joint",
  "sparkplug": "spark plug",
  "spark_plug": "spark plug",
  "timingbelt": "timing belt",
  "timing_belt": "timing belt",
  "muffler": "muffler"
};

const imageDropZone = document.getElementById('imageDropZone');

imageDropZone.addEventListener('dragover', e => e.preventDefault());

imageDropZone.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  const chatbox = document.getElementById('chatbox');

  if (!file || !file.name.match(/\.(jpg|jpeg|png)$/i)) {
    chatbox.innerHTML += `<div class="bot">Please drop a valid image file (jpg, png).</div>`;
    return;
  }

  const fileName = file.name.toLowerCase().replace(/[_\s-]/g, "").trim();
  const imgUrl = URL.createObjectURL(file);

  // Show image preview
  chatbox.innerHTML += `<div><img src="${imgUrl}" alt="Dropped Image" class="bot-img"></div>`;

  // Match filename to glossary
  let matchedTerm = null;
  for (let alias in fileAliases) {
    if (fileName.includes(alias)) {
      matchedTerm = fileAliases[alias];
      break;
    }
  }

  if (matchedTerm && glossary[matchedTerm]) {
  const entry = glossary[matchedTerm];
  chatbox.innerHTML += `<div class="bot"><strong>${matchedTerm}:</strong> ${entry.description}<br><em>${entry.note}</em></div>`;
} else {
  chatbox.innerHTML += `<div class="bot">Sorry, I don't recognize that part.</div>`;
}

  chatbox.scrollTop = chatbox.scrollHeight;
});

function translate() {
  const input = document.getElementById('userInput').value.trim().toLowerCase();
  const chatbox = document.getElementById('chatbox');


  if (!input) return;


  // Add user message
  chatbox.innerHTML += `<div class="user">${input}</div>`;


  // Smart matching
  let response = "Sorry, I don't know that one yet.";
 
  // Exact match
  if (glossary[input]) {
  const entry = glossary[input];
  response = `<strong>${input}:</strong> ${entry.description}<br><em>${entry.note}</em>`;
}
  // Flexible matching
  else {
    const normalizedInput = input.replace(/\s+/g, ' ');
    const foundKey = Object.keys(glossary).find(key =>
      key.toLowerCase().replace(/\s+/g, ' ') === normalizedInput
    );
    if (foundKey) {
  const entry = glossary[foundKey];
  response = `<strong>${foundKey}:</strong> ${entry.description}<br><em>${entry.note}</em>`;
}
  }



  // Add bot response
  chatbox.innerHTML += `<div class="bot">${response}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
  document.getElementById('userInput').value = '';
}

const inputField = document.getElementById('userInput');
const autocompleteList = document.getElementById('autocomplete-list');

inputField.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  autocompleteList.innerHTML = "";

  if (!val) return;

  const matches = Object.keys(glossary).filter(key =>
    key.toLowerCase().includes(val)
  );

  matches.slice(0, 5).forEach(key => {
    const item = document.createElement("div");
    item.innerHTML = `<strong>${key.substr(0, val.length)}</strong>${key.substr(val.length)}`;
    item.addEventListener("click", function () {
      inputField.value = key;
      autocompleteList.innerHTML = "";
      inputField.focus();
    });
    autocompleteList.appendChild(item);
  });
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (e.target !== inputField) {
    autocompleteList.innerHTML = "";
  }
});


document.getElementById("translateBtn").addEventListener("click", translate);


