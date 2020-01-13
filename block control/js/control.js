// some variables for remembering directions' keyCode
var left = 37,
    up = 38,
    right = 39,
    down = 40;

$(() => {

    /* key control of block movement */
    kd.UP.down((event) => {
        move("u")
    });
    kd.DOWN.down((event) => {
        move("d")
    });
    kd.LEFT.down((event) => {
        move("l")
    });
    kd.RIGHT.down((event) => {
        move("r")
    });

    // prevent arrow keys move the window
    $(document).on("keydown", (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40)
            e.preventDefault()
    })

    // start block control
    $("#start").on("click", () => {
        $("#start").addClass("btn-primary")
        $("#start").removeClass("btn-light")
        $("#stop").removeClass("btn-primary")
        $("#stop").addClass("btn-light")
        kd.run(() => {
            kd.tick();
        });
    })

    // stop block control
    $("#stop").on("click", () => {
        $("#stop").addClass("btn-primary")
        $("#stop").removeClass("btn-light")
        $("#start").removeClass("btn-primary")
        $("#start").addClass("btn-light")
        kd.stop()
    })

})