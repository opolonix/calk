"use strict";

const contains = (arr, elem) => {
    return arr.indexOf(elem) != -1;
}
function getListIdx(str, substr) {
    let listIdx = []
    let lastIndex = -1
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
      listIdx.push(lastIndex)
    }
    return listIdx
  }
const calk_input = document.querySelector(".calk_input")
const calk_result = document.querySelector(".calk_result")

const calk = (value) => {
    var result = 0
    var full_num = ''
    var oper = '+'
    var start = 0
    var last_elem = 0
    if (value[0] == '-') oper = '-'
    value.split('').forEach(num => {
        if (num.match(/\d/) != null){
            full_num = `${full_num}${num}`
            if (oper == '+') result = start + Number(full_num)
            if (oper == '-') result = start - Number(full_num)
        }
        else {
            last_elem = Number(full_num)
            oper = num
            full_num = ''
            start = result
        }
    });
    return result
}

calk_input.addEventListener("input", (event) => {
    var value = calk_input.value
    value = value.replace(/[^\d\+\-\*\/ \(\)]/, "")
    value = value.replace(/\([\+\-\*\/]?\)/, "")
    value = value.replace(/(\s){2,}/, " ")
    if (contains(['*', '/', '+', '-'], value[value.length - 1]) && value.length >= 2){
        if (contains(['*', '/', '+', '-'], value[value.length - 2])) value = value.substr(0, value.length-2) + value.substr(value.length-2 + 1)
    }
    calk_input.value = value

    value = value.split(" ").join("")
    // value = value.replace(/[\/\*]$/, "")
    var opers = ''
    var result = 0
    value.split('').forEach(char => {
        if (contains(['+', '-'], char)) opers += char
    });
    if (opers.length != 0){
        var count = 0
        var results = []
        value.split(/[-+]/).forEach(num => {
            results.push(calk(num))
        });
        count = 0
        console.log(results);
        results.forEach((elem) => {
            if (count == 0) {
                result = elem
            }
            else{
                if (opers[count-1] == '*') result = result*elem
                if (opers[count-1] == '/') result = result/elem
            }
            count += 1
        })
    }
    else var result = calk(value)
    calk_result.innerHTML = result
})