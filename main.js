let catNames = document.getElementById('cat-names');
let catLink = "https://api.thecatapi.com/v1/breeds"; 

function callApi() {
   axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
        for(i = 0; i < response.data.length; i++){
            let newDiv = document.createElement('div');
            catNames.appendChild(newDiv);
            newDiv.innerText = response.data[i].name;
        };
   })
}