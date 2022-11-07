// cookie to read in order to get the logged in user's id
// logout method will clear the cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



// base url and header
const clientConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




// ADD CLIENT BUTTON on clients.html
const addClientBtn = document.getElementById('add-client-btn')

// change mouseover colors
addClientBtn.addEventListener("mouseover", mouseover)
addClientBtn.addEventListener("mouseout", mouseout)

// functions to change mouseover and mouseout colors
function mouseover() {
    addClientBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addClientBtn.setAttribute("style", "background-color:#62929E")
}

// redirects user to add-appointment.html
addClientBtn.addEventListener("click", function() {
    document.location.href = 'add-client.html'
})




// GET ALL CLIENTS for clients.html
const clientContainer = document.getElementById("client-container")

async function findAllClients() {
    await fetch(`${clientConfig.baseUrl}/clients`, {
        method: "GET",
        headers: clientConfig.headers
    })
        .then(response => response.json())
        .then(data => createClientCards(data))
        .catch(err => console.error(err))
}

findAllClients()




const createClientCards = (array) => {
    clientContainer.innerHTML = ''

    array.forEach(data => {
        const clientId = data.id
        const lastName = data.lastName
        const firstName = data.firstName
        const phone = data.phone
        const email = data.email


        // append all of the client info to the cards on appointments.html
        let clientCard = document.createElement("div")

        clientCard.classList.add("client")
        clientCard.innerHTML = `
            <div class="client-card">
                 <ul class="client-styling">
                      <li class="client-styling">${lastName}</li>
                      <li class="client-styling">${firstName}</li>
                      <li class="client-styling">${phone}</li>
                      <li class="client-styling">${email}</li>
                      <li class="delete-note" onclick="handleDeleteClient(${clientId})">delete</text></li>
                 </ul>
            </div>`

        clientContainer.append(clientCard);
    })
}





// deletes a client
async function handleDeleteClient(clientId){
    await fetch(`${clientConfig.baseUrl}/clients/` + clientId, {
        method: "DELETE",
        headers: clientConfig.headers
    })
        .catch(err => console.error(err))

    return findAllClients();
}





// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}