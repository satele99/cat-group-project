let catNames = document.getElementById('cat-names');
let catLink = "https://api.thecatapi.com/v1/breeds"; 
let getNamesDone = false;

function callApi() {
   axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
        getNames(response.data);
   })
} 

function getNames(object) {
    catNames = document.getElementById('cat-names');
    if(getNamesDone == false){
        for(i = 0; i < object.length; i++){
            let catBreed = document.createElement('div');
            let hyperLink = document.createElement('a');
    
            catNames.appendChild(catBreed);
            catBreed.className = 'cat-names';
            catBreed.appendChild(hyperLink);
            hyperLink.innerText = object[i].name;
            hyperLink.setAttribute('onclick', 'getDescription()');
            hyperLink.className = 'cat-names';
        }
        getNamesDone = true;
    }
}
