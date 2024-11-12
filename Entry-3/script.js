// parallax scroll with art, border and text elements
// loop around when end so you can scroll infinitely

const mainTrack = document.getElementById("series");
const textTrack = document.getElementById("textSeries");
let t = 1;
let y = 1;

window.onwheel = e => {
    // console.log(t);
    // track.dataset.wheelDown = e.deltaY;
    // console.log(e.deltaY);

    scrollAmt = t += e.deltaY * -0.02;
    textScrollAmt = y += e.deltaY * -0.08;
    // clamp scrollAmt to prevent under or overscrolling.
    mainTrack.animate({
        transform: `translate(${scrollAmt}%, -50%)`}, {duration: 1200, fill: "forwards"});
    textTrack.animate({
        transform: `translate(${textScrollAmt}%, -50%)`}, {duration: 400, fill: "forwards"});
} // so. so i wrote this from scratch instead of using the library bc im lazy..