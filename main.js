let catNames = document.getElementById('cat-names');
let catLink = "https://api.thecatapi.com/v1/breeds"; 
let getNamesDone = false;
let getDescDone = false;

function callApi() {
   axios.get(catLink).then(response => {
        getNames(response.data);
   })
} 

function getApi(id) {
    axios.get(catLink).then(response => {
        getDescription(id, response.data);
    })
}
function getDescription(id, object) {
    if (getDescDone == false) {
        console.log(object[id].name);
        let catDescription = document.getElementById('cat-description');
        let des = document.createElement('div');
        catDescription.appendChild(des);
        des.innerText = object[id].description;
        getDescDone = true;
    }
}
function getNames(object) {
    catNames = document.getElementById('cat-names');
    let slider = document.getElementById('slider');

    if(getNamesDone == false){
        for(i = 0; i < object.length; i++){
            let catBreed = document.createElement('div');
            let hyperLink = document.createElement('a');
            if (slider.value <= 0) {
                catNames.appendChild(catBreed);
                catBreed.className = 'cat-names';
                catBreed.appendChild(hyperLink);
                hyperLink.innerText = object[i].name;
                hyperLink.id = i;
                hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                hyperLink.className = 'cat-names';
            } else if (slider.value == object[i].energy_level) {
                catNames.appendChild(catBreed);
                catBreed.className = 'cat-names';
                catBreed.appendChild(hyperLink);
                hyperLink.innerText = object[i].name;
                hyperLink.id = i;
                hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                hyperLink.className = 'cat-names';
            }
        }
        getNamesDone = true;
    }
};

function sliderValue(input, span) {
    let slider = document.getElementById(input);
    let num = document.getElementById(span);

    num.innerText = slider.value;
}; 
