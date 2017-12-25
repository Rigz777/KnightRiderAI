//instantiate socket
const socket = io();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// speech recognition options for bot to keep listening once engaged

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = true;


document.getElementById('three').addEventListener('click',() => {
  recognition.start();
});

recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  console.log('Confidence: ' + e.results[0][0].confidence);
  
//listening for the result event from speech recognition

  socket.emit('chat message', text);

//disengage browser microphone if user says goodbye

  if (text.includes('goodbye')) {
    recognition.stop();
  }
});

//uses text rendering of users speech and replies with a text response turned to voice

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
  if (utterance.volume) {
    $('.kitt').effect("highlight", {color: '#FF0000'}, 400);
  }
};

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);
});

