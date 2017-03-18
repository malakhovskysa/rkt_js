/** @Task 2
 *
 *
 * 2. Самое популярное слово
 * Ввести построчно текст, состоящий из пробелов, переводов строки и латинских букв,
 * и заканчивающийся пустой строкой. Вывести слово, которое чаще других встречается в тексте,
 * если оно такое одно, и ---, если таких слов несколько.
 *
 * Input:
 * Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed nisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet est vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis ullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor sodales a Cras egestas finibus lorem non tempor tincidunt aera
 *
 * Output:
 * tincidunt
 *
 *
 * @author Сергей Малаховский
 */

let str = [
    'Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed nisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet est vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis ullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor sodales a Cras egestas finibus lorem non tempor tincidunt aera',
    'aaa bbb aaa ccc aaaa',
    'aaa bbb aaa ccc aaaa ccc',
    'ф и с у п',
    ''
];
printResult(str, getTopWord);

function getTopWord(str) {
    const SPLIT_CHAR = ' ';
    let strArr = str.split(SPLIT_CHAR);

    let dict = {'_MaxValue': 0};

    for (let i in strArr) {
        if (strArr[i] in dict) {
            dict[strArr[i]]++;
        } else {
            dict[strArr[i]] = 1;
        }
        if (dict[strArr[i]] > dict._MaxValue) {
            dict._MaxValue = dict[strArr[i]];
            dict._keyHaveMaxValue = strArr[i];
        }
    }
    let result = getNeedWord(dict);
    return (result != '') ? result : undefined;
}

/**
 * Возвращает необходимое слово
 * @param dict
 * @param value
 */
function getNeedWord(dict) {
    let searchValue = dict._MaxValue;
    let result = '';
    let count = 0
    for (let key in dict) {
        if (dict[key] == searchValue && key != '_MaxValue') {
            if (count < 1) {
                result = key;
                count++;
            } else {
                result = '---';
                break;
            }
        }
    }
    return result;
}

function printResult(arr, func) {
    for (let i in arr) {
        console.log("Ответ:" + ' = ' + func(arr[i]));
        console.log();
    }
}