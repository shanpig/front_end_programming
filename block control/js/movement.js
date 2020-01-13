// width of the block
var image_width = Number($("#block").css("width").slice(0, -2))

var length = $("#speed").val()

// get platform width and height
var height = Number($(".box").css("height").slice(0, -2) - image_width)
var width = Number($(".box").css("width").slice(0, -2) - image_width)



$(() => {
    // refresh when block width changed
    $("#block_size").on("change", () => {
        image_width = $("#block_size").val()
        $("#block").css("width", image_width)
        move('check', 0)
    })

    // refresh when speed changed
    $("#speed").on("change", () => {
        length = $("#speed").val()
        console.log("speed change : " + length)
    })
})


// main moving function
var move = (direction) => {
    // every time we get 
    let h = Number($(".box").css("height").slice(0, -2) - image_width)
    let w = Number($(".box").css("width").slice(0, -2) - image_width)

    if (Number(h) != width) {
        width = Number(w)
    }
    if (Number(w) != height) {
        height = Number(h)
    }



    switch (direction) {
        case "u":
            moveUp(length);
            break;
        case "d":
            moveDown(length);
            break;
        case "l":
            moveLeft(length);
            break;
        case "r":
            moveRight(length);
            break;
        case "check":
            moveDown(0)
            moveLeft(0)
            moveRight(0)
            moveUp(0)
            break;
    }
}
var moveDown = (length) => {
    let d = +$("#block").css("top").slice(0, -2)
    length = +length

    if ((d + length) > height) {
        d = height
    } else {
        d += length
    }
    $("#block").css("top", d + "px")
        //console.log("block y " + $("#block").css("top"))
}
var moveLeft = (length) => {
    let l = +$("#block").css("left").slice(0, -2)
    length = +length

    if ((l - length) < 0) {
        l = 0
    } else {
        l -= length
    }
    $("#block").css("left", l + "px")
        //console.log("block x " + $("#block").css("left"))
}
var moveRight = (length) => {
    let r = +$("#block").css("left").slice(0, -2)
    length = +length

    if ((r + length) > width) {
        r = width
    } else {
        r += length
    }
    $("#block").css("left", r + "px")
        //console.log("block x " + $("#block").css("left"))
}
var moveUp = (length) => {
    let u = +$("#block").css("top").slice(0, -2)
    length = +length

    if ((u - length) < 0) {
        u = 0
    } else {
        u -= length
    }
    $("#block").css("top", u + "px")
        //console.log("block y " + $("#block").css("top"))
}