var cnvs_getCoordinates = (e) => {
    var offsetOfBox = document.getElementById('myCanvas');

    x = e.clientX - offsetOfBox.offsetLeft;
    y = e.clientY - offsetOfBox.offsetTop + $(window).scrollTop();
    $("#coord").text("(" + x + ", " + y + ")")
}

var cnvs_clear = () => {
    $("#coord").text("(x, y)")
}