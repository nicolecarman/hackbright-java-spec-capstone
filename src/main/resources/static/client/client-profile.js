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



// gets client's name using the client id we grabbed from the appointment
async function findClientById(clientId) {
    await fetch(`${clientConfig.baseUrl}/clients/${clientId}`, {
        method: "GET",
        headers: clientConfig.headers
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
}

findClientById(clientId)




const createClientProfile = (array) => {
    clientProfileContainer.innerHTML = ''

    array.forEach(data => {
        console.log(data)
        const appointmentId = data.id
        const date = data.date
        const time = data.time
        const type = data.type
        const clientId = data.clientId
        const catId = data.catId


        // append all of the appointment info to the cards on appointments.html
        let appointmentCard = document.createElement("div")

        appointmentCard.classList.add("appointment")
        appointmentCard.innerHTML = `
                                    <div class="appointment-card">
                                         <ul class="appointment-styling">
                                              <li class="appointment-styling">${date}</li>
                                              <li class="appointment-styling">${time}</li>
                                              <li class="appointment-styling">${type}</li>
                                              <li class="appointment-styling">${firstName + " " + lastName}</li>
                                              <li class="appointment-styling">${name}</li>
                                              <li><text class="delete-note" onclick="handleDeleteAppointment(${appointmentId})">delete</text></li>
                                         </ul>
                                    </div>`

        clientProfileContainer.append(appointmentCard);
    })
}















// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}