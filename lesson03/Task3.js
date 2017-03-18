/** @Task 3
 *
 *
 * Правильная скобочная последовательность.
 * Ввести последовательность символов, состоящую из “(){}[]”. Проверить на правильность и вывести результат проверки true или false.
 *
 * Input:
 * {[]({})}
 *
 * Output:
 * true
 *
 * @author Сергей Малаховский
 */


let str = [
    '{[]({})}', //true
    '{[]({})}', //true
    '(){}[]', //true
    '({[', //false
    '()}[]', //false
    '' //true
];

printResult(str, checkBraces);

function checkBraces(str) {

    const openBrace = ['{', '[', '('];
    const braces = {
        '}': '{',
        ']': '[',
        ')': '('
    };

    let stack = [];
    let result = true;
    for (let i = 0; i < str.length; ++i) {
        if (~openBrace.indexOf(str[i])) {
            //Если скобка открывающаяся
            stack.push(str[i]);
        } else {
            let el = stack.pop();
            if (el != braces[str[i]]) {
                result = false;
                break;
            }
        }
    }
    //Проверяем, что результат правильный и стэк пустой.
    return result && (stack.length == 0);
}


function printResult(arr, func) {
    for (let i in arr) {
        console.log(arr[i] + ' = ' + func(arr[i]));
        console.log();
    }
}