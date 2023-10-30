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

const calk_plus_minus = (value) => {
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
            if (oper == '-')result = start - Number(full_num)
            if (oper == '*')result = start - last_elem + (last_elem * Number(full_num)) 
            if (oper == '/')result = start - last_elem + (last_elem / Number(full_num)) 
        }

        if (num.match(/\d/) == null){
            if (oper == '*') last_elem = (last_elem * Number(full_num))
            else if (oper == '/') last_elem = (last_elem / Number(full_num))
            else last_elem = Number(full_num)
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
    result = 0
    var result = calk_plus_minus(value)
    calk_result.innerHTML = result
})