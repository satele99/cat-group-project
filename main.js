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
        let div2 = document.createElement('div');
        let imgButton = document.createElement('button');
        catDescription.appendChild(des);
        des.innerText = object[id].description;
        des.appendChild(div2);
        div2.appendChild(imgButton);
        imgButton.innerText = "See Image";
        imgButton.id = id
        imgButton.setAttribute('onclick', "getImage("+imgButton.id+")");
        getDescDone = true;
    }
}
function getImage(num) {
    axios.get(catLink).then(response => {
        let imgId = "";
        for(i =0; i < response.data.length; i++) {
            if(num == i){
                imgId = response.data[num].id;
            }
        }
        axios.get('https://api.thecatapi.com/v1/images/search?breed_ids='+imgId).then(response => {
            let catImage = document.getElementById('cat-image');
            let imgTag = document.createElement('img');

            catImage.appendChild(imgTag);
            imgTag.setAttribute('src', response.data[0].url);
            imgTag.className = 'image';
        })
    })
}
function getNames(object) {
    catNames = document.getElementById('cat-names');
    let slider = document.getElementById('slider');
    let slider2 = document.getElementById('slider2');
    let slider3 = document.getElementById('slider3');

    if(getNamesDone == false){
        for(i = 0; i < object.length; i++){
            let catBreed = document.createElement('div');
            let hyperLink = document.createElement('a');
            let x = 0;

            if ((slider.value == 0) &&
                (slider2.value == 0) &&
                (slider3.value == 0)) {
                    catNames.appendChild(catBreed);
                    catBreed.className = 'cat-names';
                    catBreed.appendChild(hyperLink);
                    hyperLink.innerText = object[i].name;
                    hyperLink.id = i;
                    hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                    hyperLink.className = 'cat-names';
                
            } else if (slider.value == object[i].energy_level){
                if (slider2.value == object[i].affection_level){
                    if(slider3.value == object[i].intelligence) {
                        catNames.appendChild(catBreed);
                        catBreed.className = 'cat-names';
                        catBreed.appendChild(hyperLink);
                        hyperLink.innerText = object[i].name;
                        hyperLink.id = i;
                        hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                        hyperLink.className = 'cat-names';
                        console.log(x + " all filters set are true");
                    }
                }
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
