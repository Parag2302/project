const wrapper = document.querySelector(".wrapper"), //selecting wrapper or parent container
searchInput = wrapper.querySelector("input"), //selecting serach input
searchInputBtn = wrapper.querySelector('#search-button');
volume = wrapper.querySelector(".word i"), //selecting volume icon
infoText = wrapper.querySelector(".info-text"); //selecting error-box
const synonymsContainer = document.querySelector('#synonyms');
const antonymsContainer = document.querySelector('#antonyms');
let audio; //audio variable
function data(result, word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    }else{
        console.log(result)
        let definitions = result[0].meanings[0].definitions[0],
        phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phontetics;
        document.querySelector("#meaning-id").innerText = definitions.definition;
        document.querySelector("#example-id").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);
    }
}

// calling the fetch api for word search
function search(word){
    fetchApi(word);
    searchInput.value = word;
}

async function fetchApi(word){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    let meaningResponse = await fetch(url).then(response => response.json())
    data(meaningResponse, word);
    //.catch(() =>{
    //    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    //});


    let synonymsUrl = `https://api.datamuse.com/words?ml=${word}`; //URL FOR SYNONYMS
    let antonymsUrl = `https://api.datamuse.com/words?rel_ant=${word}`; //URL FOR ANTONYMS

    let synonymsResponse = await fetch(synonymsUrl).then(response => response.json()); //FETCHING SYNONYMS DATA
    let antonymsResponse = await fetch(antonymsUrl).then(response => response.json()); //FETCHING ANTONYMS DATA
    console.log(meaningResponse);
    renderWords(synonymsResponse, antonymsResponse);

}

//fetch(url) //getting the data from api
//.then( function t1 (response) { response.json() }) //converting into json format
//.then( function t2 (result) { data(result, word)
//console.log(result) }) //passing the fetched information to data function for further use 
//.catch( function c1 () {
 //   infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
//}); //will execute when error occur during the fetch function is executed

// adding event listner to perform save the data by user and perform api call
searchInput.addEventListener("keyup", function f1 (e) {
    let word = e.target.value.replace(/\s+/g, ' ');  //storing data from input by the user
    if(e.key == "Enter" && word){
        fetchApi(word); //calling api
    }
});

searchInputBtn.addEventListener("click", function f10 (e) {
    let word = searchInput.value.replace(/\s+/g, ' ');  //storing data from input by the user
    
    fetchApi(word); //calling api
    
});


// click event to change the color of the volume button and play the audio
volume.addEventListener("click", function f2 () {
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});


//DISPLAYING THE FETCHED DATA IN DOM
const renderWords = (wordsArr1, wordsArr2) => {
    let htmlCode;
    if(wordsArr1.length > 0){
        wordNotFound = false;
        htmlCode = wordsArr1.map(word => {
            return `<span class = "word-item"><ul> <li> ${word.word} </li></ul> </span>`;
        });
        synonymsContainer.innerHTML = htmlCode.join("");
        htmlCode = wordsArr2.map(word => {
            return `<span class = "word-item"><ul> <li> ${word.word} </li></ul></span>`;
        });
        antonymsContainer.innerHTML = htmlCode.join("");
    } else {
        wordNotFound = true;
        htmlCode = "___";
        synonymsContainer.innerHTML = htmlCode;
        antonymsContainer.innerHTML = htmlCode;
    }
}