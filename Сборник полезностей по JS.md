#### Сборник полезностей по JS:

##### Важные столпы программирования на JS:

1. Всегда округляй числовые значений - myRound()
2. Всегда преобразовывай значение переменной к числовому, когда хочешь интерпретировать его, как число - 
3. Всегда проверяй на некорректный ввод (особенно, при числовых операциях)

> Вообще, все циклы, и методы работы с данными работают почти также, как и в C++ (C#), что удобно.
>
> Также, любая переменная (даже любая единица массива) имеет свой тип данных, который меняется в зависимости от наполнения. Что тоже удобно.
>
> Для объявления переменных используется ключевое слово let, или const.

##### Основы:

Запрос ввода данных от пользователя (1й аргумент - вопрос, 2й - начальное значение)

```js
let n = prompt('Введите максимальное значение, n =', "5");
```

Вывод текста на страницу (Также выводит любые теги)

```JS
document.write(`123`);
```

Вывод текста в консоль (для вызова консоли нажмите f12 в браузере)

```JS
console.log(`123`);
```

Если вы используете функцию, то обязательно нужно вернуть значение

``` JS
return res;
```

Для добавления значений в массивы удобно использовать эту функцию:

```JS
arr.push(value_n);
```

Тернарный оператор:

```
a === b ? a = 1 : a = 0;
```



##### Полезные функции:

Проверка на правильность ввода числа:

```JS
if (isNaN(parseInt(n)) || !isFinite(n)) 
{
    alert('Ошибочное число: ' + n);
} else {
    ...
}

```

Функция, возвращающая количество знаков, после запятой:

```JS
const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
```

Округление числа до указанного количества знаков после запятой:

```JS
function myRound(int, okr)
{
    let out = Math.round((int)*10**okr)/10**okr;
    return(out); 
}
```

Удалить все пробелы из строки:

```JS
html = html.replace(/\s/g, '');
```

Также, перевести все символы в нижний регистр:

```
.toLowerCase();
```

Вывод верной подписи для числа:

```JS
function showMessage(age) 
{
    let year;

    if((age % 100 >= 11) && ((age % 100 <= 15))) {
        year = "лет";
    } else if(age % 10 == 1) {
        year = "год";
    } else if ((age % 10>=2) && (age % 10 <= 4)) {
        year = "года";
    } else {
        year = "лет";
    }

    return year;
}
```

Функция, которая вытаскивает весь текст из тегов:

```JS
function getItem(html) {
  html = html.replace(/\s/g, '');
  let out_b = [];

  let startTableInd = html.indexOf('<table>');
  let endTableInd = html.indexOf('</table>');

  //console.log('startTableInd = ' + startTableInd);
  //console.log('endTableInd = ' + endTableInd);

  if((startTableInd == -1) || (endTableInd == -1))
  {
    let map_0 = {}
    return(map_0);
  }

  let a = 0; // <
  let b = 0; 
  let out_l = "";   

  for(let i = startTableInd; i < endTableInd; i++) //html.length; i++)
  {
    if(html[i] == '<') 
    {
      a = 1;
      continue;
    }

    if((html[i] == '>') && (a == 1)) 
    {
      a = 0;
      continue;
    }

    if(a == 0) 
    {
      b = 1;
      out_l += html[i];
    }

    if ((a == 1) && (b == 1))
    {
      //console.log('out_l = ' + out_l);
      out_b.push(out_l);
      out_l = '';
      b = 0;
    }
  }
}
```

Вывод даты в привычном виде:

```JS
function toShortDate(date) {
  //увеличиваем значение месяца на 1, чтобы перейти к нумерации месяцев с 1
  return `${date.getDate()}.${date.getMonth()+ 1}.${date.getFullYear()}`;
}
```

Разница между датами в днях:

```JS
function validate(data) {
  let first = new Date(data.firstDate.value);
  let second = new Date(data.secondDate.value);
 
  // разница вычисляется в миллисекундах, которая затем приводится 
  // к количеству дней
  let diff = (second - first) / (1000 * 60 * 60 * 24);

  alert(diff); // результат: 33
}
```

Генерирует случайное целое число в интервале от а до b:

```JS
function getSize(a, b) {
   return Math.round(a + Math.random() * (b - a));
}
```

Таймер:

```js
console.log("Таймер запущен");
bloorMult = 0;
timerId = setInterval(function() {
    console.log('Таймер сработал');
    bloorMult += 0.1;
    BloorB(bloorMult);
    if(bloorMult >= 5) {
        clearInterval(timerId);
        console.log('Таймер остановлен');
    }
}, 5); 
// 5 - это как часто срабатывает таймер
// Например, 1000 - это один раз в секунду
```

---

#### Скрипты обработки строк:

Удаляет нужное количество переносов строк:

```JS
function RemoveBigSpases_3(str) {
    str = str.replace(/\s{2,20}/g, '\n');
    return str;
}
```

Удаляет из строки заданные подстроки:

```JS
let arrSubst2 = [
    "&nbsp;",
    "Url",
    "&lt;",
    "Информация к комментарию"
]

function replSomeSubstr2(str) {
    str = String(str);

    let newStr = str;

    for(let i = 0; i < arrSubst2.length; i++) {
        newStr = newStr.split(arrSubst2[i]).join("");
    }

    return newStr;
}
```

Возвращает текст, найденный между двух подстрок:

```JS
function GetTextFromTwoSubstrings(substr_1, substr_2, str) {
    const startIndex = str.indexOf(substr_1) + substr_1.length;
    const endIndex = str.indexOf(substr_2);
    const resultString = str.substring(startIndex, endIndex);

    return resultString;
}

//Минусы: Нет вывода ошибок, если подстроки не обнаружены
```

Удаляет текст, между двух подстрок:

```JS
// Корректно удаляет, но только одно вхождение
function RemoveTextBetweenTwoSubstrings(substr_1, substr_2, str) {
    const startIndex = str.indexOf(substr_1) + substr_1.length;
    const endIndex = str.indexOf(substr_2);
    const textToRemove = str.substring(startIndex, endIndex);
    const resultString = str.replace(substr_1 + textToRemove + substr_2, '');
  
    return resultString;
}
```

```JS
// Корректно удаляет все вхождения (ограничен 300шт.)
function RemoveTextBetweenTwoSubstrings(substr_1, substr_2, str) {
    let resultString = str;
    let startIndex = resultString.indexOf(substr_1) + substr_1.length;
    let endIndex = resultString.indexOf(substr_2);

    let count = 0;
    
    while (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      count++;
      const textToRemove = resultString.substring(startIndex, endIndex);
      resultString = resultString.replace(substr_1 + textToRemove + substr_2, '');
      startIndex = resultString.indexOf(substr_1) + substr_1.length;
      endIndex = resultString.indexOf(substr_2);
      if(count > 300) break;
    }
    
    return resultString;
}
```





