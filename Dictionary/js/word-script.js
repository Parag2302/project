const wordText = document.querySelector(".word"),
meaningText = document.querySelector(".meaning span"),
refreshBtn = document.querySelector(".refresh-word");

const initWord = () => {
    let randomObj = uniquewords[Math.floor(Math.random() * uniquewords.length)];
    let wordArray = randomObj.word.split("");
    wordText.innerText = wordArray.join("");
    meaningText.innerText = randomObj.meaning;
    
}
initWord();

refreshBtn.addEventListener("click", initWord);



