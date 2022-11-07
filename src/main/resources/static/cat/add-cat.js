// cookie to read in order to get the logged in user's id
// logout method will clear the cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



// base url and header
const catConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




// gets DOM object (the client dropdown menu) and applies an event listener to the selection
// that the user makes. In other words, it pulls the cats of whatever client the user clicks on
//const selectElement = document.getElementById('client-cat-selection');

//selectElement.addEventListener('change', (event) => {
    //populateClientOptions('client-cat-selection', event.target.value)
//});





// Pulls add cat form from add-appointment.html
const addCatForm = document.getElementById('add-cat-form')

// add cat
const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        clientId: document.getElementById('client-cat-selection').value,
        name: document.getElementById('cat-name').value,
        breed: document.getElementById('cat-breed').value,
        age: document.getElementById('cat-age').value,
        pattern: document.getElementById('cat-pattern').value,
        color: document.getElementById('cat-color').value,
        gender: document.querySelector('input[name="cat-gender"]:checked').value,
        altered: document.querySelector('input[name="cat-altered"]:checked').value,
        vaccine: document.getElementById('cat-vaccine').value
    }

    const response = await fetch(`${catConfig.baseUrl}/cats/add-cat`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: catConfig.headers
    })
        .then(response => response.json())

        .then(data => {
            console.log(data);
            window.location.pathname = '/cat/cats.html';
        })

        .catch(err => console.error(err.message))
}

addCatForm.addEventListener("submit", handleSubmit)




// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
