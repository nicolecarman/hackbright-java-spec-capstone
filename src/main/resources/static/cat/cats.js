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



// ADD APPOINTMENT BUTTON on appointments.html
const addCatBtn = document.getElementById('add-cat-btn')

// change mouseover colors
addCatBtn.addEventListener("mouseover", mouseover)
addCatBtn.addEventListener("mouseout", mouseout)

// functions to change mouseover and mouseout colors
function mouseover() {
    addCatBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addCatBtn.setAttribute("style", "background-color:#62929E")
}

// redirects user to add-appointment.html
addCatBtn.addEventListener("click", function() {
    document.location.href = 'add-cat.html'
})




// GET ALL CATS for cats.html
const catContainer = document.getElementById("cat-container")

async function findAllCats() {
    await fetch(`${catConfig.baseUrl}/cats`, {
        method: "GET",
        headers: catConfig.headers
    })
        .then(response => response.json())
        .then(data => createCatCards(data))
        .catch(err => console.error(err))
}




const createCatCards = (array) => {
    array.forEach(data => {
        // save cat info to variables
        const catId = data.id;
        const name = data.name;
        const gender = data.gender;
        const altered = data.altered;
        const vaccine = data.vaccine;
        const clientId = data.clientId;


        // gets client's name using the client id we grabbed from the cat
        async function getClientName(clientId) {
            await fetch(`${catConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: catConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                    // save client's name into variables
                    const firstName = data.firstName;
                    const lastName = data.lastName;


                    // append all of the appointment info to the cards on appointments.html
                    const catCard = document.createElement("div")

                    catCard.classList.add("cat")
                    catCard.innerHTML = `
                    <div class="cat-card">
                         <ul class="cat-styling">
                              <li class="cat-styling">${name}</li>
                              <li class="cat-styling extra-padding">${firstName} ${lastName}</li>
                              <li style="width: 100px">${gender}</li>
                              <li style="width: 75px">${altered}</li>
                              <li class="cat-styling">${vaccine}</li>
                              <li class="cat-styling" onclick="handleDeleteCat(${catId})">delete</text></li>
                         </ul>
                    </div>`

                    catContainer.append(catCard);
                })
                //.catch(err => console.error(err))
        }
        getClientName(clientId)

    })
    //.catch(err => console.error(err))
}

findAllCats()




// deletes a cat
async function handleDeleteCat(catId){
    await fetch(`${catConfig.baseUrl}/cats/` + catId, {
        method: "DELETE",
        headers: catConfig.headers
    })
        .catch(err => console.error(err))

    return findAllCats();
}




// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}