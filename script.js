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
const multiplication_division_range = /([-]?[\d]+\.?[\d]*)([*/])([\d]+\.?[\d]*)/
const addition_subtraction_range = /([-]?[\d]+\.?[\d]*)([+-])([\d]+\.?[\d]*)/
const multiplication_division = (value) => { // умножение деление, выполняется после раскрывания скобок
    let reg_match = value.match(multiplication_division_range)
    if (reg_match != null){
        let oper = reg_match[2]
        let first = Number(reg_match[1])
        let second = Number(reg_match[3])
        let rslt
        if (oper == '*') rslt = first*second
        if (oper == '/') rslt = first/second
        value = value.replace(reg_match[0], String(rslt))
    }
    if (value.match(multiplication_division_range) != null) return multiplication_division(value)
    else return String(value)
}
const addition_subtraction = (value) => { // сложение вычитание
    var reg_match = value.match(addition_subtraction_range)
    if (reg_match != null){
        var oper = reg_match[2]
        let first = Number(reg_match[1])
        let second = Number(reg_match[3])
        let rslt
        if (oper == '+') rslt = first+second
        if (oper == '-') rslt = first-second
        value = value.replace(reg_match[0], String(rslt))
    }
    if (value.match(addition_subtraction_range) != null) return addition_subtraction(value)
    else return String(value)
}
const rm_parentheses = (value) => { // раскрывание скобок
    let await_close = false
    let expression
    let sum
    let clk
    let count = 0
    value.split('').forEach(char => {
        if (await_close){
            if (char == '(') sum += 1
            if (char == ')') sum -= 1
            if (sum == 0){
                await_close = false
                if (contains(expression, '(') || contains(expression, ')')) {
                    clk = multiplication_division(rm_parentheses(expression))
                    clk = addition_subtraction(clk)
                    value = value.replace(`(${expression})`, clk)
                }
                else{
                    clk = multiplication_division(expression)
                    clk = addition_subtraction(clk)
                    value = value.replace(`(${expression})`, clk)
                }
            }
            expression += char
        }
        else {
            if (char == '('){
                await_close = true
                sum = 1
                expression = ''
            }
        }
        count += 1
    });
    return value
}
calk_input.addEventListener("input", (event) => {
    var value = calk_input.value
    event.preventDefault()
    value = value.replace(/[^\d\+\-\*\/\s\(\)\.]/, "")
    if (contains(['*', '/', '+', '-'], value[value.length - 1]) && value.length >= 2){
        if (contains(['*', '/', '+', '-'], value[value.length - 2])) value = value.substr(0, value.length-2) + value.substr(value.length-2 + 1)
    }
    if (contains(['*', '/', '+'], value[0])) value = value.substr(1)
    value = value.split("..").join(".")
    value = value.split("++").join("+")
    value = value.split("**").join("*")
    value = value.split("//").join("/")
    value = value.split("--").join("-")

    let reg = value.match(/(\d)\(/)
    while (reg != null){
        value = value.replace(reg[0], `${reg[1]}*(`)
        reg = value.match(/(\d)\(/)
    }


    calk_input.value = value

    // дальше происходит подстчет результата
    value = value.split(" ").join("")
    
    let result = rm_parentheses(value)
    result = multiplication_division(result)
    result = addition_subtraction(result)

    if (result != '') calk_result.innerHTML = result
    else calk_result.innerHTML = 0
})
document.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ) {
        calk_input.value = calk_result.innerHTML
    }
});