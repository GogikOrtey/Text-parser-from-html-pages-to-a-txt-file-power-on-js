
// out_files

let fileDataArray = [];

let num = 100;
let addStr = '';

function openFiles(callback) {
  for(let i = 1; i <= num; i++) {
    let fileLocation = './js/files/' + addStr + '(' + i + ').html';  
    fetch(fileLocation)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const decoder = new TextDecoder('windows-1251');
        fileData = decoder.decode(buffer);

        fileDataArray.push(fileData);

        if(i === num) {
          callback(fileDataArray);
        }
      })
      .catch(error => console.error(error));
  }
}

/*
// Старая процедура, всё работает

function openFiles(callback) {
  for(let i = 0; i < filesToOpen.length; i++) {
    let fileLocation = './js/files/' + filesToOpen[i];

    fetch(fileLocation)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const decoder = new TextDecoder('windows-1251');
        fileData = decoder.decode(buffer);

        fileDataArray.push(fileData);

        if(i === filesToOpen.length - 1) {
          callback(fileDataArray);
        }
      })
      .catch(error => console.error(error));
  }
}
*/

openFiles(function(fileDataArray) {
  let allMainStr = '';

  for(let i = 1; i <= num; i++) {
    let strMainOut = '\n\n';

    let str = fileDataArray[i-1];
    // Потом тут будет цикл for

    str = String(str);

    //let resultString = getTitle(str);

    // Нахожу заголовок
    let resultString = GetTextFromTwoSubstrings(
        `<h1><span id="news-title">`,
        `</span></h1>`,
        str
    );
    //console.log(resultString); // --Получаю готовый верный текст (заголовок)
    strMainOut += '##' + resultString;
    





    // Нахожу основной текст
    let allText = GetTextFromTwoSubstrings(
        `<div class="maincont">`,
        `<div class="clr">`,
        str
    );

    // Убираю из него все теги
    allText = getItem(allText);
    allText = allText.join(""); // Соединяю в строку, так как там на выходе массив

    // Удаляю дополнительные мешающие символы
    allText = replSomeSubstr(allText);

    allText = RemoveTextBetweenTwoSubstrings(
        `$("#`,
        `");`,
        allText
    );
    
    allText = RemoveBigSpases_2(allText);
    //allText.trimLeft();
    allText = allText.substring(3);

    //console.log(allText); // --Получаю готовый верный текст (основной текст)
    strMainOut += '\n\n' + allText;









    //----------- Комментарии -----------

    // Проверяю, есть ли блок комментариев на странице
    if(str.indexOf(`<div id="dle-ajax-comments">`) != -1) {

      // Выбираю контент с начала блока комментариев, и до конца страницы
      let commText = GetTextFromTwoSubstrings(
          `<div id="dle-ajax-comments">`,
          `</html>`,
          str
      );

      //console.log('контент с начала блока комментариев, и до конца страницы' + commText);

      // Удаляю от туда блок, который идёт после комментариев
      commText = RemoveTextBetweenTwoSubstrings(
          `<div class="berrors">`,
          `</body>`,
          commText
      );

      //console.log('Удаляю от туда блок, который идёт после комментариев ' + commText);

      commText = getItem(commText);
      commText = commText.join("");

      commText = replSomeSubstr2(commText);


      commText = RemoveTextBetweenTwoSubstrings(
          `$("#`,
          `");`,
          commText
      );

      commText = RemoveBigSpases_3(commText);


      //if(commText != '') 
      //console.log('[Комментарии]');
      strMainOut += '\n\n--- [Комментарии] ---';
      //console.log(commText);
      strMainOut += '\n\n' + commText;
    } else {
      //console.log('[Комментариев нет]');
      strMainOut += '\n\n--- [Комментариев нет] ---';
    }

    strMainOut += '\n\n-----';

    //console.log('[i = ' + i + '] \n' + strMainOut);
    console.log('[i = ' + i + '] \n');
    //CreateOut_txt_files(i, strMainOut);
    allMainStr += strMainOut;
  }
  CreateOut_txt_files(0, allMainStr);
});

function CreateOut_txt_files(ind, str) {
  const content = str; // строка, которую мы хотим записать в файл
  const file = new Blob([content], {type: 'text/plain'}); // создаем Blob
  const a = document.createElement('a'); // создаем элемент ссылки
  a.href = URL.createObjectURL(file); // устанавливаем ссылку на Blob
  a.download = 'File ' + ind + '.txt'; // устанавливаем имя файла для скачивания
  document.body.appendChild(a); // добавляем элемент ссылки на страницу
  a.click(); // автоматически запускаем загрузку файла
}





// ------------------ Комментарии

function RemoveBigSpases_3(str) {
    str = str.replace(/\s{2,20}/g, '\n');
    return str;
}


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




// ------------------ Работаем с основным текстом и заголовками

function RemoveBigSpases_2(str) {
    str = str.replace(/\s{4,10}/g, '\n');
    return str;
}


function GetTextFromTwoSubstrings(substr_1, substr_2, str) {
    const startIndex = str.indexOf(substr_1) + substr_1.length;
    const endIndex = str.indexOf(substr_2);
    const resultString = str.substring(startIndex, endIndex);

    return resultString;
}

/*
// Корректно удаляет, но только одно вхождение
function RemoveTextBetweenTwoSubstrings(substr_1, substr_2, str) {
    const startIndex = str.indexOf(substr_1) + substr_1.length;
    const endIndex = str.indexOf(substr_2);
    const textToRemove = str.substring(startIndex, endIndex);
    const resultString = str.replace(substr_1 + textToRemove + substr_2, '');
  
    return resultString;
}
*/

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


let arrSubst = [
    "&nbsp;",
    "Url"
]

function replSomeSubstr(str) {
    str = String(str);  
    //let substr = ", ";
    let newStr = str; 
    for(let i = 0; i < arrSubst.length; i++) {
        newStr = newStr.split(arrSubst[i]).join("");
    } 
    return newStr;
}


function getItem(html) {
    //html = html.replace(/\s/g, '');
    let out_b = [];
  
    let a = 0; // <
    let b = 0; 
    let out_l = "";   
  
    for(let i = 0; i < html.length; i++) //html.length; i++)
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

    return out_b;
}