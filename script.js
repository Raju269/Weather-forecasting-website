// Simulated weather data (use real API in production)
const temp = 30; // in °C
const uvIndex = 8; // 0 to 11+
const humidity = 70;
const windSpeed = 45; // km/h
const pressure = 990;

// AI Clothing Suggestion
if (temp > 30) {
  document.getElementById("clothing").innerText = "Wear light cotton clothes 👕";
} else if (temp > 20) {
  document.getElementById("clothing").innerText = "T-shirt & jeans are fine 👖";
} else {
  document.getElementById("clothing").innerText = "Wear warm clothes 🧥";
}

// Health Tip AI
if (uvIndex > 7) {
  document.getElementById("health").innerText = "Use sunscreen, high UV detected 🌞";
} else {
  document.getElementById("health").innerText = "Safe UV level 👍";
}

// Disaster Alert AI
if (windSpeed > 60 || pressure < 980) {
  document.getElementById("disaster").innerText = "⚠️ Potential storm or cyclone risk!";
} else {
  document.getElementById("disaster").innerText = "No natural disaster risk ✅";
}

// Skin Care Suggestion
if (humidity > 80) {
  document.getElementById("skin").innerText = "Use anti-humidity facewash 💧";
} else {
  document.getElementById("skin").innerText = "Moisturizer recommended 🧴";
}

// Voice Assistant
function speakWeather() {
  const text = `Today is ${temp} degrees. UV index is ${uvIndex}. Wind speed is ${windSpeed} kilometers per hour.`;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
