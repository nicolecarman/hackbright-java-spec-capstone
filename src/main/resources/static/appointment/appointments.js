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
const addClientBtn = document.getElementById('add-appointment-btn')

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
    array.forEach(data => {
        // save appointment info to variables
        const date = data.date;
        const time = data.time;
        const type = data.type;
        const clientId = data.clientId;
        const catId = data.catId;


        // gets client's name using the client id we grabbed from the appointment
        async function getClientName(clientId) {
            await fetch(`${appointmentConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: appointmentConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                    // save client's name into variables
                    const firstName = data.firstName;
                    const lastName = data.lastName;


                    // gets cat's name using the cat id we grabbed from the appointment
                    async function getCatName(catId) {
                        await fetch(`${appointmentConfig.baseUrl}/cats/${catId}`, {
                            method: "GET",
                            headers: appointmentConfig.headers
                        })
                            .then(response => response.json())
                            .then(data => {

                                // save cat's name into variable
                                const catName = data.name;


                                // append all of the appointment info to the cards on appointments.html
                                const appointmentCard = document.createElement("div")

                                appointmentCard.classList.add("appointment")
                                appointmentCard.innerHTML = `
                                <div class="appointment-card">
                                    <ul class="appointment-styling">
                                        <li class="appointment-styling">${date}</li>
                                        <li class="appointment-styling">${time}</li>
                                        <li class="appointment-styling">${type}</li>
                                        <li class="appointment-styling">${firstName} ${lastName}</li>
                                        <li class="appointment-styling">${catName}</li>
                                        <li class="appointment-styling" onclick="handleDeleteAppointment(${data.id})">delete</text></li>
                                    </ul>
                                </div>`

                                appointmentContainer.append(appointmentCard);
                            })
                            .catch(err => console.error(err))
                    }
                    getCatName(catId)

                })
                .catch(err => console.error(err))
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

