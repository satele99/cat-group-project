let catNames = document.getElementById('cat-names');
let catLink = "https://api.thecatapi.com/v1/breeds"; 
let getNamesDone = false;
let getDescDone = false; 
let getImgDone = false;
let foundResult = false;


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
        let catDescription = document.getElementById('cat-description');
        let des = document.createElement('div');
        let div2 = document.createElement('div');
        let imgButton = document.createElement('button');
        catDescription.appendChild(des);
        des.id = 'desc-div';
        des.innerText = object[id].description;
        des.appendChild(div2);
        div2.id = 'desc-img';
        div2.appendChild(imgButton);
        imgButton.innerText = "See Image";
        imgButton.id = id
        imgButton.setAttribute('onclick', "getImage("+imgButton.id+")");
        getDescDone = true;
    }
    else if (getDescDone == true) {
        let dynDiv = document.getElementById('desc-div');
        let imgDiv = document.getElementById('desc-img');

        imgButton = document.createElement('button');
        div2 = document.createElement('div');
        dynDiv.innerText = object[id].description;
        dynDiv.appendChild(div2);
        div2.id = 'desc-img';
        div2.appendChild(imgButton);
        imgButton.innerText = "See Image";
        imgButton.id = id;
        imgButton.setAttribute('onclick', "getImage("+imgButton.id+")");
    }
}
function getImage(num) {
    axios.get(catLink).then(response => {
        let imgId = "";
        for(i =0; i < response.data.length; i++) {
            if(num == i){
                imgId = response.data[num].id;
                console.log(imgId);
            }
        }
        if (getImgDone == false) {
            axios.get('https://api.thecatapi.com/v1/images/search?breed_ids='+imgId).then(response => {
                let catImage = document.getElementById('cat-image');
                let catDiv = document.createElement('div');
                let imgTag = document.createElement('img');

                catImage.appendChild(catDiv);
                catDiv.id = 'catDiv';
                catDiv.appendChild(imgTag);
                imgTag.setAttribute('src', response.data[0].url);
                imgTag.setAttribute('width', 253);
                imgTag.setAttribute('height', 210);
                imgTag.className = 'image';
                getImgDone = true;
            })
        }else if(getImgDone == true) {
            axios.get('https://api.thecatapi.com/v1/images/search?breed_ids='+imgId).then(response => {
                let catDiv = document.getElementById('catDiv');
                let imgTag = document.createElement('img');

                catDiv.innerHTML = "";
                catDiv.appendChild(imgTag);
                imgTag.setAttribute('src', response.data[0].url);
                imgTag.setAttribute('width', 253);
                imgTag.setAttribute('height', 210);
                imgTag.className = 'image';
            })
        }
    })
}
function getNames(object) {
    catNames = document.getElementById('cat-names');
    let catBreed = document.createElement('div');
    let slider = document.getElementById('slider');
    let slider2 = document.getElementById('slider2');
    let slider3 = document.getElementById('slider3');
    let slider4 = document.getElementById('slider4');
    

    if(getNamesDone == false){
        for(i = 0; i < object.length; i++){
            catBreed = document.createElement('div');
            let hyperLink = document.createElement('a');

            if ((slider.value == 0) &&
                (slider2.value == 0) &&
                (slider3.value == 0) &&
                (slider4.value == 0)) {
                    console.log('no filter entered')
                    catNames.appendChild(catBreed);
                    catBreed.className = 'cat-names';
                    catBreed.appendChild(hyperLink);
                    hyperLink.innerText = object[i].name;
                    hyperLink.id = i;
                    hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                    hyperLink.className = 'cat-names';
                    foundResult = true;
                
            } else if (slider.value == object[i].energy_level)
            {
                if (slider2.value == object[i].affection_level)
                {
                    if(slider3.value == object[i].intelligence) 
                    {
                        if(slider4.value == object[i].child_friendly) 
                        {
                            catNames.appendChild(catBreed);
                            catBreed.className = 'cat-names';
                            catBreed.appendChild(hyperLink);
                            hyperLink.innerText = object[i].name;
                            hyperLink.id = i;
                            hyperLink.setAttribute('onclick', "getApi("+hyperLink.id+")");
                            hyperLink.className = 'cat-names';
                            foundResult = true;
                        }
                    }
                }
            }
        }
        if(foundResult == false) {
            catNames.appendChild(catBreed);
            catBreed.className = 'cat-names';
            catBreed.innerText = 'No Matches Found! Click to Refresh.';
            catBreed.setAttribute('onclick', 'reset()');
        }
        getNamesDone = true;
    }
}; 
function reset() {
    location.reload();
}

function sliderValue(input, span) {
    let slider = document.getElementById(input);
    let num = document.getElementById(span);

    num.innerText = slider.value;
}; 

// the end. :)
// the end again.