var recent, record;
var interval;
var loop_num = 0;

// time value initiation
var timer_ms, timer_sc, timer_mn, timer_hr
timer_ms = timer_sc = timer_mn = timer_hr = 0
$(() => {
    // start/ pause timer
    $("#start_pause").on("click", (e) => {
            start_pause_timer()
        })
        // reset timer
    $(".reset").on("click", () => {
            reset_timer()
        })
        // loop timer
    $(".loop").on("click", () => {
        loop_timer()
        $(".info-block").prop("scrollTop", $(".info-block").prop("scrollHeight"))
    })
})

/* strat or pause the timer */
function start_pause_timer() {
    // click pause button
    if ($(".pause#start_pause").length == 1) {
        // log info
        console.log("clear interval : " + interval)

        // stop timer
        clearInterval(interval)

        // change text : Resume
        $("#start_pause").text("Resume")

        // change class : .pause => .start
        $("#start_pause").addClass("start").removeClass("pause")
    }
    // click when resume/start state
    else {
        // change text : Pause
        $("#start_pause").text("Pause")
            // change class : .start => .pause
        $("#start_pause").addClass("pause").removeClass("start")

        // set timer, get each time value by incrementing and carry out/in
        var frame_rate = 32
        interval = setInterval(() => {
            // increment time by frame rate
            timer_ms += frame_rate

            // set milisecond data, carry out to second
            if (timer_ms >= 1000) {
                timer_ms = 0
                timer_sc += 1
            }
            // set second data, carry out to minute
            if (timer_sc >= 60) {
                timer_sc = 0
                timer_mn += 1
            }
            // set minute data, carry out to hour
            if (timer_mn >= 60) {
                timer_mn = 0
                timer_hr += 1
            }
            // set hour data, overflow --> reset
            if (timer_hr >= 24) {
                timer_hr = 0
            }
            // get timer value
            timer_string = get_timer_value()
                // show the current timer value
            $("#timer").text(timer_string)
        }, frame_rate);

        // log info
        console.log("set interval : " + interval)
    }
}

// reset the timer, clear loop container
function reset_timer() {
    // log info
    console.log("reset interval num : " + interval)

    // reset timer
    clearInterval(interval)

    // reset timer value
    $("#timer").text("00 : 00 : 00 : 000")
    timer_ms = timer_sc = timer_mn = timer_hr = loop_num = 0

    // change text : Start
    $("#start_pause").text("Start")

    // change class : pause => start
    $("#start_pause").addClass("start").removeClass("pause")

    // clear loop container
    $("#loop_container").empty()
}

// add loop data to loop conatiner
function loop_timer() {
    // get timer value
    var timer_string = get_timer_value()

    // count loop num
    loop_num += 1

    // set loop value
    $p = $("<p>" + loop_num + " : &nbsp<span id='loop_time'>" + timer_string + "</span></p>")

    // add to loop container
    $("#loop_container").append($p)
}
/* get timer output value */
function get_timer_value() {
    return timer_hr.toString().padStart(2, "0") + " : " + timer_mn.toString().padStart(2, "0") + " : \
                     " + timer_sc.toString().padStart(2, "0") + " : " + timer_ms.toString().padStart(3, "0")
}