// parallax scroll with art, border and text elements
// loop around when end so you can scroll infinitely

const track = document.getElementById("series");
let t = 1;

window.onwheel = e => {
    // console.log(t);
    track.dataset.wheelDown = e.deltaY;
    // console.log(e.deltaY);

    scrollAmt = t += e.deltaY * -0.02;
    // clamp scrollAmt to prevent under or overscrolling.
    track.animate({
        transform: `translate(${scrollAmt}%, -50%)`}, {duration: 1200, fill: "forwards"});
}