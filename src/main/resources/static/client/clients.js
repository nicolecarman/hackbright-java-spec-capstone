const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];




const clientConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const addClientBtn = document.getElementById('add-client-btn')


addClientBtn.addEventListener("mouseover", mouseover)
addClientBtn.addEventListener("mouseout", mouseout)


function mouseover() {
    addClientBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addClientBtn.setAttribute("style", "background-color:#62929E")
}


addClientBtn.addEventListener("click", function() {
    document.location.href = 'add-client.html'
})





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
        const address = data.address
        const city = data.city
        const state = data.state
        const zipcode = data.zipcode
        const phone = data.phone
        const email = data.email


        let clientCard = document.createElement("div")

        clientCard.classList.add("client")
        clientCard.innerHTML = `
            <div class="client-card">
                 <ul>
                      <li style="font-size: 17px; width: 130px">${lastName}, ${firstName}</li>
                      <li style="font-size: 17px; width: 300px;">${address}, ${city}, ${state}, ${zipcode}</li>
                      <li class="client-styling" style="font-size: 17px; width: 125px">${phone}</li>
                      <li class="client-styling" style="font-size: 17px">${email}</li>
                      <li class="delete" onclick="handleDeleteClient(${clientId})">delete</text></li>
                 </ul>
            </div>`

        clientContainer.append(clientCard);
    })
}




async function handleDeleteClient(clientId){
    await fetch(`${clientConfig.baseUrl}/clients/` + clientId, {
        method: "DELETE",
        headers: clientConfig.headers
    })
        .catch(err => console.error(err))

    return findAllClients();
}





function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}