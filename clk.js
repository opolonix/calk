"use strict";

let str = '(3+3*(2-5))*(34-5/4)*(34-5/4*(34-5*(34-5/4)*(34-5/1)/4))*(34-5/4)';
console.log(str);
let parentheses_tree = []
const multiplication_division_range = /([-]?[\d]+\.?[\d]*)([*/])([\d]+\.?[\d]*)/
const addition_subtraction_range = /([-]?[\d]+\.?[\d]*)([+-])([\d]+\.?[\d]*)/

const contains = (arr, elem) => {
    return arr.indexOf(elem) != -1;
}
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
    let parentheses_tree = [];
    let await_close = false
    let expression
    let sum
    let count = 0
    let expression_value
    let oper = '*'
    let clk
    value.split('').forEach(char => {
        if (await_close){
            if (char == '(') sum += 1
            if (char == ')') sum -= 1
            if (sum == 0){
                await_close = false
                if (contains(expression, '(') || contains(expression, ')')) {
                    value = value.replace(`(${expression})`, rm_parentheses(expression))
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
    });
    return value
}

console.log(rm_parentheses(str));