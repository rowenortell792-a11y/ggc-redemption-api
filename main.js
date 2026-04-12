// PULSE MICRO v0.1 - WORKING SIMULATION
let pulseScore = 0;
let frequency = "1S";
let increasing = true;

const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

let waveformData = new Array(100).fill(0);

function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (increasing) {
        pulseScore += 0.5;
        if (pulseScore >= 100) increasing = false;
    } else {
        pulseScore -= 0.5;
        if (pulseScore <= 0) increasing = true;
    }
    
    if (pulseScore < 15) frequency = "1S";
    else if (pulseScore < 30) frequency = "2S";
    else if (pulseScore < 45) frequency = "3M";
    else if (pulseScore < 55) frequency = "4M";
    else if (pulseScore < 70) frequency = "5M";
    else if (pulseScore < 85) frequency = "6X";
    else frequency = "7X";
    
    const amplitude = pulseScore / 100;
    waveformData.push(amplitude);
    waveformData.shift();
    
    ctx.beginPath();
    for (let i = 0; i < waveformData.length; i++) {
        const x = (i / (waveformData.length - 1)) * canvas.width;
        const y = canvas.height/2 + waveformData[i] * (canvas.height/2);
        ctx.lineTo(x, y);
    }
    ctx.strokeStyle = '#00ff95';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    document.getElementById('frequency').innerText = frequency;
    document.getElementById('pulseScore').innerText = Math.floor(pulseScore);
    document.getElementById('attention').innerText = Math.floor(pulseScore) + '%';
    
    requestAnimationFrame(drawWaveform);
}

drawWaveform();