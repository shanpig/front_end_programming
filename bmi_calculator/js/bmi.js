$(() => {
    // get height and weight
    $("#calculate").on('click', () => {
        var hh = $("#bmi_height").val();
        var ww = $("#bmi_weight").val();
        var h = Number(hh);
        var w = Number(ww);
        var bmi = w / (h / 100) ** 2;
        $("#outputBMI").attr("placeholder", "BMI : " + bmi)
    })
})