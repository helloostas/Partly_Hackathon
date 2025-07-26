const glossary = {
  "guard": "fender panel",
  "bumper": "bumper cover",
  "nearside": "left side (passenger side in UK, driver side in NZ)",
  "offside": "right side (driver side in UK, passenger side in NZ)",
  "boot": "trunk",
  "bonnet": "hood",
  "windscreen": "windshield",
  "door": "which part? door shell, handle, or window assembly?",
  "driveshaft": "rotating axle that transfers power from engine to wheels"
};

function translate() {
  const input = document.getElementById("input").value.toLowerCase();
  let translated = input;

  for (const [term, plain] of Object.entries(glossary)) {
    const regex = new RegExp(`\\b${term}\\b`, 'g');
    translated = translated.replace(regex, `**${plain}**`);
  }

  document.getElementById("output").innerHTML = `
    <strong>Translation:</strong><br>${translated.replace(/\n/g, '<br>')}
  `;
}
