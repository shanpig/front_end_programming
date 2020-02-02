var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
    // set the canvas height/2 as the clock radius
var offset = canvas.height / 2
    // set ctx default x, y origin as new_radius
ctx.translate(offset, offset)
radius = offset * 0.9
setInterval(drawClock, 1000)


function drawClock() {
    drawFace()
    drawRim()
    drawCenterDot()
    drawNumbers()
    drawTime()
}

function drawFace() {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
}

function drawRim() {
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');

    ctx.strokeStyle = grad
    ctx.lineWidth = radius * 0.1
    ctx.stroke()
}

function drawCenterDot() {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers() {
    var ang
        // set font style
    ctx.font = radius * 0.15 + "px Arial"
        // set text align point to middle of the cursor
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    for (var i = 1; i < 13; i++) {
        ang = i * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0, -radius * 0.85)
        ctx.rotate(-ang)
        ctx.fillText(i.toString(), 0, 0)
        ctx.rotate(ang)
        ctx.translate(0, radius * 0.85)
        ctx.rotate(-ang)
    }
}

function drawTime() {
    // get time data
    var now = new Date()
    var hr = now.getHours() % 12
    var mn = now.getMinutes()
    var sc = now.getSeconds()

    var hr_ang = (hr * Math.PI / (6)) + (mn * Math.PI / (6 * 60)) + (sc * Math.PI / (360 * 60))
    var mn_ang = mn * Math.PI / (30) + sc * Math.PI / (30 * 60)
    var sc_ang = sc * Math.PI / (30)
    $("#test").text(hr + ", " + mn + ", " + sc)
    drawHand(ctx, hr_ang, radius * 0.5, radius * 0.07)
    drawHand(ctx, mn_ang, radius * 0.8, radius * 0.04)
    drawHand(ctx, sc_ang, radius * 0.9, radius * 0.02)

}

function drawHand(ctx, ang, length, width) {
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.lineCap = "round"
    ctx.moveTo(0, 0)
    ctx.rotate(ang)
    ctx.lineTo(0, -length)
    ctx.stroke()
    ctx.rotate(-ang)
}