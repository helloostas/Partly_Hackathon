// HARDCODED GLOSSARY SOLUTION (No JSON file needed)
const glossary = {
  "spark plug": {
    description: "A part that produces a spark to ignite fuel in the engine and start combustion.",
    note: "$5-$25 per plug (most cars need 4-8). Labor: $50-$150 if done by mechanic."
  },
  "cv joint": {
    description: "A joint in your axle that helps your wheels turn smoothly while driving.",
    note: "$200-$600 per axle including labor. Boot replacement alone: $150-$300."
  },
  "alternator": {
    description: "Charges your battery and powers electrical systems while the engine runs.",
    note: "$400-$800 rebuilt, $600-$1,200 new. Labor: 1.5-3 hours ($150-$300)."
  },
  "oil pan gasket": {
    description: "A rubber seal that prevents engine oil from leaking out of the oil pan.",
    note: "$20-$80 for part. Labor-intensive: $150-$400 total (engine access often requires disassembly)."
  },
  "timing belt": {
    description: "A belt that synchronizes the engine’s camshaft and crankshaft.",
    note: "$500-$1,000 with labor (includes water pump replacement). Critical - breaks at 60,000-100,000 miles."
  },
  "brake pad": {
    description: "Pads that press against the brake disc to slow or stop your car.",
    note: "$30-$150 per axle for parts. $100-$300 total with labor. Ceramic pads cost more but last longer."
  },
  "radiator": {
    description: "A part that helps cool down the engine and prevents it from overheating.",
    note: "$300-$900 total. Aluminum radiators cost more than plastic. Labor: 1-3 hours."
  },
  "fuel injector": {
    description: "Sprays fuel into the engine in fine mist so it can combust.",
    note: "$150-$300 per injector. V6/V8 engines need 6-8. Labor: $200-$500 for full set."
  },
  "air filter": {
    description: "A filter that keeps dust and debris out of the engine.",
    note: "$15-$50. Easiest DIY job (takes 5 minutes without tools)."
  },
  "check engine light": {
    description: "A warning light on your dashboard indicating something’s wrong.",
    note: "$50-$150 diagnostic fee. Repair costs vary wildly from $20 (loose gas cap) to $2,000+."
  },
  "muffler": {
    description: "Part of the exhaust system that reduces engine noise.",
    note: "$200-$600. Stainless steel lasts longer. Labor: $100-$200. Some states require OEM parts."
  },
  "engine control unit": {
    description: "The car’s onboard computer that controls engine performance.",
    note: "$500-$1,500 for part + $200-$400 programming. Used units may save costs."
  },
  "oxygen sensor": {
    description: "Measures oxygen in exhaust gases to optimize fuel efficiency.",
    note: "$100-$250 per sensor. Most cars have 2-4. Labor: $50-$100 per sensor."
  },
  "transmission": {
    description: "Changes gears to help your car move at different speeds.",
    note: "$3,000-$6,000+ for rebuild/replacement. Fluid changes every 30,000-60,000 miles prevent issues."
  },
  "battery": {
    description: "Provides the electrical power to start your car and run electronics.",
    note: "$100-$300. Labor: $20-$50 if not DIY. Lasts 3-5 years. Premium batteries have longer warranties."
  },
  "headlight bulb": {
    description: "Lights on the front of your car that help you see at night.",
    note: "$10-$50 per bulb. Labor: $25-$100 (some models require bumper removal). LED upgrades cost more."
  },
  "windshield wipers": {
    description: "Keeps your windshield clear of rain and debris.",
    note: "$15-$50 per set. Replace every 6-12 months. Easy DIY installation."
  },
  "water pump": {
    description: "Circulates coolant through your engine to keep it from overheating.",
    note: "$300-$800 total. Often replaced with timing belt (saves on labor costs)."
  },
  "drive belt": {
    description: "Transfers power from engine to components like AC and alternator.",
    note: "$25-$100 for belt. Labor: $100-$200. Replace every 60,000-100,000 miles."
  },
  "catalytic converter": {
    description: "Reduces harmful emissions by converting exhaust gases.",
    note: "$800-$2,500 OEM. Aftermarket: $400-$1,200. Theft-prone - engrave your VIN on it."
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


document.getElementById("translateBtn").addEventListener("click", translate);

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") document.getElementById("translateBtn").click();
});

const glossaryTerms = Object.keys(glossary);
const inputField = document.getElementById("userInput");
const suggestionBox = document.getElementById("suggestions");

inputField.addEventListener("input", function () {
  const value = inputField.value.toLowerCase();
  suggestionBox.innerHTML = '';

  if (!value) return;

  const matches = glossaryTerms.filter(term =>
    term.toLowerCase().includes(value)
  );

  matches.slice(0, 5).forEach(match => {
    const li = document.createElement("li");
    li.textContent = match;
    li.addEventListener("click", () => {
      inputField.value = match;
      suggestionBox.innerHTML = '';
      translate(); // Optionally auto-submit
    });
    suggestionBox.appendChild(li);
  });
});

// Hide suggestions when clicking elsewhere
document.addEventListener("click", e => {
  if (!suggestionBox.contains(e.target) && e.target !== inputField) {
    suggestionBox.innerHTML = '';
  }
});
