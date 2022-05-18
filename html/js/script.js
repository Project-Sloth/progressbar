$('document').ready(function() {
    window.addEventListener('message', function(event) {
        switch(event.data.action) {
            case 'progress':
                draw(event.data)
                break;
            case 'cancel':
                cancel();
                break;
        }
    });
});

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;
let degrees = 0;
let new_degrees = 0;
let time = 0;
let color = "#12f2eb";
// // let color = "#eb5757";
let bgcolor = "rgba(0, 0, 0, 0.35)";
let bgcolor2 = "#f63737";
let animation_loop;
let animation_loop_full;
let cancel_timeout;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {

    // Clear the canvas every time a chart is drawn
    ctx.clearRect(0,0,W,H);

    // Background 360 degree arc
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 28.5;
    ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
    ctx.stroke();

    // Angle in radians = angle in degrees * PI / 180
    let radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineWidth = 25;
    ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();
}

let addition = 0
function draw(data) {
    color = "#12f2eb";   
    ctx.clearRect(0,0,W,H);
    addition = 0;
    degrees = 0;
    $(".label").css("color", color);
    if (typeof cancel_timeout !== undefined) clearTimeout(cancel_timeout);
    $(".icon").html(`<i class=\"fa-solid fa-bars-progress\" style=\"color:${color}\"></i>`);
    if (typeof animation_loop !== undefined) clearInterval(animation_loop);
    let duration = data.duration;
    $(".label").text(data.label);
    $(".container").css("opacity", "0");
    if (data.icon !== null && data.icon !== undefined) { // Trying to use inv image that isn't there, no icon will show
        $(".icon").html(`<i style=\"color:${color}\" class=\"${data.icon}\"> <img src=${data.icon} onerror="this.onerror=null; this.remove();"> </i>`);
    }
    $( ".container" ).animate({
        opacity: 1,
    }, 500);
    degrees = 0;
    duration = duration * 0.25;
    new_degrees = 360;
    addition = (360 / duration);
    animation_loop = setInterval(animate_to, 1);
}

function animate_to() {
    if (degrees >= 360) {
        clearInterval(animation_loop);
        $( ".container" ).animate({
            opacity: 0,
        }, 500, function() {
            $.post('https://progressbar/FinishAction', JSON.stringify({
                })
            );
        });
        return;
    }
    init();
    degrees+=addition;
}

function cancel() {
    color = bgcolor2;
    clearInterval(animation_loop);
    // addition = (new_degrees - degrees) / 50;
    animation_loop_full = setInterval(animate_to_full, 1);
    $(".label").text("CANCELLED!");
    $(".label").css("color", bgcolor2);
    $(".icon").html("<i class=\"fa-solid fa-xmark\" style='color: " + color + "'></i>");
    cancel_timeout = setTimeout(function () {
        clearInterval(animation_loop_full);
        $( ".container" ).animate({
            opacity: 0,
        }, 500, function() {
            $.post('https://progressbar/CancelAction', JSON.stringify({
                })
            );
        });
    }, 1000);
}

function animate_to_full() {
    init();
    // degrees+=addition;
}