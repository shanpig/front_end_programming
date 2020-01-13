var run = ()=>{
    
    console.log($("path").length)
    var initial_content = ["肌肉介紹", "訓練影片", "點擊左方人體肌肉圖或右上角下拉清單選擇身體部位"]

    var show_training = (part_id) => {
        console.log("get input part name : " + part_id + ", type : " + typeof(part_id))
        var part = training_data[part_id]
        var title = part[0]
        $("#bodyname").html(title)
        $("#content").empty()
        $("g.current").removeClass("current")
        $("g[partname=" + part_id + "]").addClass("current")

        for (var i = 1; i < part.length; i++) {
            // console.log(part[i])
            var videoLink = part[i][0]
            var videoName = part[i][1]
            $a = $("<a>").attr("href", videoLink).html(videoName)
            $a.attr("target", "_blank")
            $("#content").append($a)
            $("#content").append($("<br>"))

        }
    }

    var show_muscle = (part_id) => {
        console.log("get input part name : " + part_id + ", type : " + typeof(part_id))
        var part = muscles_data[part_id]
        //console.log(training_data["chest-area"])
        var title = part[0]
        var engTitle = part[1]
        $("#bodyname").html(title)
        $("#content").empty()
        $("g.current").removeClass("current")
        $("g[partname=" + part_id + "]").addClass("current")

        $p = $("<p>").html(part[2])
        $("#content").append($p)
    }




    console.log("document ready")
        // close the infomation block
    $("#close").on("click", () => {
        $("#info").children().empty()
        if ($(".active").text().trim() === "Training") {
            $("#bodyname").html(initial_content[1])
        } else {
            $("#bodyname").html(initial_content[0])
        }
        $("#content").html(initial_content[2])
        $("g.current").removeClass("current")
    })

    // open the info of which part being clicked
    $("path").on("click", (e) => {
        var partName = $(e.target).parent().attr("partname")
        console.log(e.target)
        console.log(partName)
        if ($(".active").text().trim() === "Training")
            show_training(partName)
        if ($(".active").text().trim() === "Muscles")
            show_muscle(partName)
    })
   
    
    
    $("a.dropdown-item").on("click", (e) => {
        var partName = $(e.target).attr("partname")
        if ($(".active").text().trim() === "Training")
            show_training(partName)
        if ($(".active").text().trim() === "Muscles")
            show_muscle(partName)
    })
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
    });
    }


$(() => {
    // force reload if miss catching data
    //if ($("path").length!=24){
    //    document.location.reload(true);
    //}else {
    //    document.location.reload(false);
   // }
    
    w3.includeHTML()

    var intervalID = window.setInterval(()=>{
        if ($("path").length==24){
            window.clearInterval(intervalID)
            run()
        }
    }, 1000)
   
    
    // wait path to be 24 then run the rest code
    

    /*$(window).on("load", () => {
        console.log("test");
    })*/
})
