/** @Task 1
 *
 * 1. Строка — повторение подстроки
 * Ввести непустую строку s. Найти такое наибольшее число k и такую строку t,
 * что s совпадает со строкой t, выписанной k раз подряд. Вывести k.
 *
 * Input:
 * abcabcabcabc
 *
 * Output:
 * 4
 * @author Сергей Малаховский
 */


let strs = ['abcabcabcabc', 'abcdabc abcdabc ', 'abc', 'abba abba abba '];

function solve(str) {
    if (str.length == 0) return;
    let partlen = str.length / 2;
    let t = [];
    t.push(str[0]);
    let buf;
    let result;
    for (let i = 1; i < partlen; ++i) {
        buf = str[i];
        if (t[0] != buf) {
            t.push(buf);
        } else {
            if (compareString(t, str, i) && (result = countSubstr(str, t)) != 0) {
                return result;
            } else {
                t.push(buf);
            }
        }
    }
    return (compareString(t, str, str.length / 2)) ? 2 : 1;
}

/**
 * Проверка вхождения массива символов во вторую строку, начиная с позициий startIndex
 * @param strArr массив символоа
 * @param str2 строка 2
 * @param startIndex строка 2
 * @return {boolean} true, если короткая строка является частью другой.
 */
function compareString(strArr, str2, startIndex) {
    if (strArr.length + startIndex > str2.length) return false;
    for (let i = 0; i < strArr.length; ++i) {
        if (strArr[i] != str2[startIndex + i]) return false;
    }
    return true;
}


/**
 * Проверяет, состоит строка str толкьо из повторяющейс подстроки substr1.
 * Если да, то возвращает количество вхождений, 0 иначе.
 * @param str - строка.
 * @param substr - подстрока.
 * @return {number} - количество вхождений.
 */
function countSubstr(str, substr) {
    if (str.length % substr.length != 0) return 0;
    let predictVal = str.length / substr.length;

    let counter = 0;
    let i = 0;
    let step = substr.length;
    while (i < str.length) {
        if (compareString(substr, str, i)) {
            counter++;
            i += step;
        }
    }
    return (counter == predictVal) ? predictVal : 0;
}

function printResult(arr, func) {
    for (let i in arr) {
        console.log(arr[i] + ' = ' + func(arr[i]));
        console.log();
    }
};

printResult(strs, solve);