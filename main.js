// PULSE MICRO v0.1 - VOICE + TOUCH (No Camera)
// CONFIDENTIAL - Trade Secret of GGC Holdings

let pulseScore = 0;
let frequency = "1S";
let voiceStress = 0;
let touchActivity = 0;
let waveformData = new Array(100).fill(0);

const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

// Voice stress detection (WORKS ON IPHONE)
async function initVoice() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        function detectStress() {
            analyser.getByteFrequencyData(dataArray);
            let avg = 0;
            for (let i = 0; i < dataArray.length; i++) avg += dataArray[i];
            avg /= dataArray.length;
            voiceStress = Math.min(1, avg / 128);
            requestAnimationFrame(detectStress);
        }
        detectStress();
        document.getElementById('voiceStatus').innerText = 'READY';
    } catch(e) {
        document.getElementById('voiceStatus').innerText = 'BLOCKED';
    }
}

// Touch engagement (WORKS ON IPHONE)
document.addEventListener('touchmove', () => {
    touchActivity = Math.min(1, touchActivity + 0.1);
    setTimeout(() => { touchActivity *= 0.95; }, 100);
    document.getElementById('engageStatus').innerText = Math.floor(touchActivity * 100) + '%';
});

document.addEventListener('mousemove', () => {
    touchActivity = Math.min(1, touchActivity + 0.1);
    setTimeout(() => { touchActivity *= 0.95; }, 100);
    document.getElementById('engageStatus').innerText = Math.floor(touchActivity * 100) + '%';
});

function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Voice is primary input (80%), touch is secondary (20%)
    let amplitude = voiceStress * 0.8;
    amplitude += touchActivity * 0.2;
    amplitude = Math.min(0.9, Math.max(0.05, amplitude));
    
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
    
    const avgAmplitude = waveformData.reduce((a,b) => a+b, 0) / waveformData.length;
    pulseScore = Math.floor(avgAmplitude * 100);
    
    if (pulseScore < 15) frequency = "1S";
    else if (pulseScore < 30) frequency = "2S";
    else if (pulseScore < 45) frequency = "3M";
    else if (pulseScore < 55) frequency = "4M";
    else if (pulseScore < 70) frequency = "5M";
    else if (pulseScore < 85) frequency = "6X";
    else frequency = "7X";
    
    document.getElementById('frequency').innerText = frequency;
    document.getElementById('pulseScore').innerText = pulseScore;
    document.getElementById('attention').innerText = pulseScore + '%';
    
    requestAnimationFrame(drawWaveform);
}

initVoice();
drawWaveform();