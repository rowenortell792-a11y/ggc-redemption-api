// PULSE MICRO v0.1 - REAL BIOMETRIC
let pulseScore = 0;
let frequency = "1S";
let gazeX = 0.5;
let voiceStress = 0;
let mouseActivity = 0;
let waveformData = new Array(100).fill(0);

const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

// WebGazer eye tracking
const script = document.createElement('script');
script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
script.onload = () => {
    webgazer.setGazeListener((data) => {
        if (data) gazeX = data.x / window.innerWidth;
    }).begin();
};
document.head.appendChild(script);

// Voice detection
async function initVoice() {
    const stream = await