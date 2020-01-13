var find = (data) => {
    var sum = 0
    for (let i = 0; i < data.length; i++) {
        sum += data[i]
    }

    var avg = sum / data.length

    var result = {
        "sum": sum,
        "avg": avg
    }

    return result
}

data = [46, 99, 12, 59, 30]