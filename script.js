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
    var await_close = false
    var await_close_count = false
    var await_close_value = ''
    if (value[0] == '-') oper = '-'
    var count = 0
    var this_num = 0
    var start_pos
    value.split('').forEach(num => {
        if (await_close){
            await_close_value += num;
            if (num == '(') await_close_count += 1
            if (num == ')') await_close_count -= 1
            // console.log(await_close_count);
            // console.log(calk_plus_minus(await_close_value.replace(")", "")));
            
            if (count + 1 == value.length || await_close_count == 0) {
                full_num = calk_plus_minus(await_close_value.replace(")", ""))
                if (oper == '+') result = start + Number(full_num)
                if (oper == '-') result = start - Number(full_num)
                if (oper == '*') {
                    if (full_num == 0) full_num = 1
                    // console.log(last_elem);
                    result = start - last_elem + (last_elem * Number(full_num))
                } 
                if (oper == '/') result = start - last_elem + (last_elem / Number(full_num)) 
                await_close = false
                await_close_count = false
                await_close_value = ''
            }
        }
        else{

            if (num.match(/\d/) != null){
                full_num = `${full_num}${num}`
                if (oper == '+') result = start + Number(full_num)
                if (oper == '-') result = start - Number(full_num)
                if (oper == '*') result = start - last_elem + (last_elem * Number(full_num)) 
                if (oper == '/') result = start - last_elem + (last_elem / Number(full_num)) 
            }

            if (num.match(/\d/) == null){
                if (num == '('){
                    await_close = true
                    await_close_value = ''
                    await_close_count = 1
                    start_pos = count
                    if (value[count-1] != undefined && value[count-1].match(/\d/) != null) oper = "*"
                }
                else{
                    if (oper == '*') last_elem = (last_elem * Number(full_num))
                    else if (oper == '/') last_elem = (last_elem / Number(full_num))
                    else last_elem = Number(full_num)
                    oper = num
                    full_num = ''
                    start = result
                }
            }
        }
        count += 1
    });
    return result
}

calk_input.addEventListener("input", (event) => {
    var value = calk_input.value
    value = value.replace(/[^\d\+\-\*\/ \(\)]/, "")
    // value = value.replace(/\([\+\-\*\/]?\)/, "")
    // value = value.replace(/(\s){2,}/, " ")
    if (contains(['*', '/', '+', '-'], value[value.length - 1]) && value.length >= 2){
        if (contains(['*', '/', '+', '-'], value[value.length - 2])) value = value.substr(0, value.length-2) + value.substr(value.length-2 + 1)
    }
    calk_input.value = value

    value = value.split(" ").join("")
    result = 0
    var result = calk_plus_minus(value)
    calk_result.innerHTML = result
})