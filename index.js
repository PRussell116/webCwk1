function id() {
  return "UP806925";
}

function multiples(times) {
  let sum = 0;
  for (let i = 0; i < times; i++) {
    if (i % 3 == 0 || i % 5 == 0) { //if mult of 3 or 5 increase sum by i
      sum = sum + i;
    }
  }
  return sum;

}

function betterMultiples(limit, arrayOfMult = []) {
  // if empty use 3 and 5
  if (arrayOfMult == "") {
    arrayOfMult = [3, 5];
  }

  // check if its a mutli if so add it
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    if (isMult(i, arrayOfMult) == true) {
      sum += i;
    }
  }
  return sum;
}

// check if one or the other is a mutiple if so return true
function isMult(number, arrayOfMult) {
  let result = false;
  for (let i = 0; i < arrayOfMult.length; i++) {
    if (number % arrayOfMult[i] == 0) {
      result = true;
    }
  }
  return result;
}

function sumOfCharacters(str) {
  let sumOfChar = 0;
  for (let i = 0; i < str.length; i++) {
    sumOfChar += str.charCodeAt(i); // get utf16 and add
  }
  return sumOfChar;
}

function sentenceWordSums(sent) {
  let letterCountArray = [];
  let score = 0;
  for (let i = 0; i < sent.length; i++) {

    if (sent[i] != " ") {
      score += sent.charCodeAt(i);
    } else if (sent[i - 1] != " ") { //stops adding zeros if repeating whitespace
      letterCountArray.push(score);
      score = 0;
    }

    if (i == sent.length - 1) { //end of list push score
      letterCountArray.push(score)
    }
  }
  return letterCountArray;
}

function sumOfSentence(sent, minLen) {
  // if len not there set to 0
  let wordArray = [];
  if (minLen == undefined) {
    minLen = 0;
  }

  /// put sentence in array without whitespace
  let currentWord = "";
  for (let i = 0; i < sent.length; i++) {
    if (sent[i] != " ") {
      currentWord += sent[i// prevent whitespace error
      ];
    } else if (sent[i - 1] != " ") {
      wordArray.push(currentWord);
      currentWord = "";
    }
    // at end of sentence push word
    if (i == sent.length - 1) {
      wordArray.push(currentWord);
    }
  }
  // calc the values
  let sum = 0;
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length >= minLen) {
      sum += sumOfCharacters(wordArray[i]);
    }
  }
  return sum;
}

function palindrome(str, ignoreWS) {
  if (str === "") { // cant have empty
    return false;
  }

  if (ignoreWS == true) {
    //removes whitespace and hands non WS string

    let newPalin = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] != " ") {
        newPalin += str[i];
      }
    }
    return checkPalin(newPalin)
  } else {
    return checkPalin(str);

  }

}
function checkPalin(str) { //function to check the chars match
  let result = true;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] != str[str.length - i - 1]) {
      result = false;
    }
  }
  return result;
}

function emojify(str) {
  let newString = str;
  for (let i = 0; i < str.length; i++) {
    newString = newString.replace("(TM)", "™️")
    newString = newString.replace("<3", "❤️");
    newString = newString.replace('&lt;3', "❤️")
    newString = newString.replace(":-)", "😀");
  }
  return newString;
}

function pageEmojify(selec) {
  let ele = document.querySelector(selec);
  ele.innerHTML = emojify(ele.innerHTML);

}

function treeEmojify(eleSelec) {
  let ele = document.querySelector(eleSelec);
  for (let i = 0; i < ele.children.length; i++) {
    ele.children[i].innerHTML = emojify(ele.children[i].innerHTML);
  }

}

function spanner(selec, prefix) {
  let ele = document.querySelector(selec);

  // get the words in an array
  let eleWords = []
  let currentWord = "";
  let eleInner = ele.textContent;
  for (let i = 0; i < eleInner.length; i++) {
    if (eleInner[i] != " ") {
      currentWord += eleInner[i// prevent whitespace error
      ];
    } else if (eleInner[i - 1] != " ") {
      eleWords.push(currentWord);
      currentWord = "";
    }
    // end of array push final word
    if (i == eleInner.length - 1) {
      eleWords.push(currentWord);
    }
  }

  // put items from array in spans and give them ids then append to ele
  for (let i = 0; i < eleWords.length; i++) {

    let newSpan = document.createElement('span');
    newSpan.setAttribute("id", prefix + i);
    newSpan.textContent = eleWords[i];
    ele.appendChild(newSpan);

  }
  return ele;

}

function clickAttacher(selec, cName) {
  // add listeners to all queried eles
  let selectedEles = document.querySelectorAll(selec);
  for (let i = 0; i < selectedEles.length; i++) {
    selectedEles[i].addEventListener("click", toggleName);
  }
  // toggle the class
  function toggleName(event) {
    this.classList.toggle(cName);

  }

}

async function linkedDrawing(canvas, url) {
  urlArray = [url];
  let response = await fetch(url);
  while (response.ok) {
    const data = await response.json();

    // draw the line
    let c = canvas.getContext("2d");
    c.beginPath();
    c.moveTo(data.x1, data.y1);
    c.lineTo(data.x2, data.y2)
    c.strokeStyle = data.col;
    c.stroke();
    c.closePath();

    // update the array and change to next url
    urlArray.push(data.url);
    response = await fetch(data.url);
  }
  return urlArray;
}
