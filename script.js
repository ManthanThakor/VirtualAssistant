let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let voices = [];

// Function to load available voices
function loadVoices() {
  voices = speechSynthesis.getVoices();
  console.log(voices); // Log voices to find the one you want
}

// Function to speak text
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1.2; // Adjust pitch for a cuter voice
  text_speak.volume = 1;

  // Try to find a female voice
  const femaleVoice =
    voices.find((voice) => voice.name.toLowerCase().includes("female")) ||
    voices[0];

  if (femaleVoice) {
    text_speak.voice = femaleVoice;
  }

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  // Respond to commands
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you?");
  } else if (message.includes("who are you")) {
    speak("I am your virtual assistant, created by Ayush Sir");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com/", "_blank");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else {
    speak("I'm sorry, I didn't understand that.");
  }
}

// Load voices when the page loads
window.addEventListener("load", () => {
  loadVoices();
  wishMe();
});

// Refresh voices when they change
speechSynthesis.onvoiceschanged = loadVoices;
