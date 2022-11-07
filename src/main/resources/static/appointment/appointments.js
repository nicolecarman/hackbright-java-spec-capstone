// cookie to read in order to get the logged in user's id
// logout method will clear the cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



// base url and header
const appointmentConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




// ADD APPOINTMENT BUTTON on appointments.html
const addAppointmentBtn = document.getElementById('add-appointment-btn')

// change mouseover colors
addAppointmentBtn.addEventListener("mouseover", mouseover)
addAppointmentBtn.addEventListener("mouseout", mouseout)

// functions to change mouseover and mouseout colors
function mouseover() {
    addAppointmentBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addAppointmentBtn.setAttribute("style", "background-color:#62929E")
}

// redirects user to add-appointment.html
addAppointmentBtn.addEventListener("click", function() {
    document.location.href = 'add-appointment.html'
})




// GET ALL APPOINTMENTS for appointments.html
const appointmentContainer = document.getElementById("appointment-container")

async function findAllAppointments() {
    await fetch(`${appointmentConfig.baseUrl}/appointments`, {
        method: "GET",
        headers: appointmentConfig.headers
    })
        .then(response => response.json())
        .then(data => createAppointmentCards(data))
        .catch(err => console.error(err))
}

findAllAppointments()




const createAppointmentCards = (array) => {
    appointmentContainer.innerHTML = ''

    array.forEach(data => {
        const appointmentId = data.id
        const date = new Date(data.date).toLocaleDateString()
        const time = new Date(data.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const type = data.type
        const clientId = data.clientId
        const catId = data.catId


        // gets client's name using the client id we grabbed from the appointment
        async function getClientName(clientId) {
            await fetch(`${appointmentConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: appointmentConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                     const firstName = data.firstName
                     const lastName = data.lastName


                        // gets cat's name using the cat id we grabbed from the appointment
                        async function getCatName(catId) {
                            await fetch(`${appointmentConfig.baseUrl}/cats/${catId}`, {
                                method: "GET",
                                headers: appointmentConfig.headers
                            })
                                .then(response => response.json())
                                .then(data => {
                                    const name = data.name


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
                                              <li><text class="delete" onclick="handleDeleteAppointment(${appointmentId})">delete</text></li>
                                         </ul>
                                    </div>`

                                    appointmentContainer.append(appointmentCard);
                                })
                        }

                        getCatName(catId)

                })
        }

        getClientName(clientId)

    })
}





// deletes an appointment
async function handleDeleteAppointment(appointmentId){
    await fetch(`${appointmentConfig.baseUrl}/appointments/` + appointmentId, {
        method: "DELETE",
        headers: appointmentConfig.headers
    })
        .catch(err => console.error(err))

    return findAllAppointments();
}





// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}