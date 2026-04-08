const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
let pulseScore = 0;

canvas.width = 800;
canvas.height = 200;

function drawWaveform() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw waveform line
    ctx.beginPath();
    for (let i = 0; i < canvas.width; i += 10) {
        const y = canvas.height/2 + Math.sin(Date.now()/500 + i/20) * pulseScore;
        ctx.lineTo(i, y);
    }
    ctx.strokeStyle = '#00ff95';
    ctx.stroke();
    
    // Update pulse score (0-100)
    pulseScore = (pulseScore + 0.5) % 100;
    document.getElementById('pulseScore').innerText = Math.floor(pulseScore);
    document.getElementById('attention').innerText = Math.floor(pulseScore) + '%';
    
    requestAnimationFrame(drawWaveform);
}
drawWaveform();
