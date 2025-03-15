import react, { useEffect } from "react";
function Hsection1() {
    useEffect(() => {

        const background = document.getElementById('background');

function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    const size = Math.random() * 80 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height =` ${size}px`;

    const minWidth = 0;
    const maxWidth = background.clientWidth - size; 
    const randomLeft = Math.random() * (maxWidth - minWidth) + minWidth;

    bubble.style.left = `${randomLeft}px`;

    const gradientColors = [
        'linear-gradient(to bottom, #ff0080, #ffa500)',
        'linear-gradient(to bottom, #40e0d0, #ff1493)',
        'linear-gradient(to bottom, #7fff00, #ff4500)',
        'linear-gradient(to bottom, #ffccff, #ffebcd)',
        'linear-gradient(to bottom, #8a2be2, #5f9ea0)'
    ];
    bubble.style.background = gradientColors[Math.floor(Math.random() * gradientColors.length)];

    bubble.style.animationDuration =` ${Math.random() * 10 + 15}s`; 

    background.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, (parseFloat(bubble.style.animationDuration) * 1000));
}

setInterval(createBubble, 500);

window.addEventListener('resize', () => {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const bubbleRightEdge = bubble.offsetLeft + bubble.offsetWidth;
        if (bubbleRightEdge > background.clientWidth) {
            bubble.remove();
        }
    });
});
    }, [])
    return (
        <div id="background">
            <div style={{textAlign:"center",padding:"100px 0 100px 0"}}>
            <h1>Ask whatever's on your mind with IntelliVibe AI.</h1>
            <a href="/chat">Use</a>
            </div>
        </div>
    );
};
export default Hsection1;