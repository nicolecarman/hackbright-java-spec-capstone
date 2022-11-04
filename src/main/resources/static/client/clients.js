// ADD APPOINTMENT BUTTON on appointments.html
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



/*
// COPIED FROM APPOINTMENTS.JS FOR FUNCTIONALITY
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




const createAppointmentCards = (array) => {
    array.forEach(data => {
        const appointmentCard = document.createElement("div")

        appointmentCard.innerHTML = `
            <div class="appointment-card">
                    <ul class="appointment-styling">
                        <li class="appointment-styling">${data.date}</li>
                        <li class="appointment-styling">${data.time}</li>
                        <li class="appointment-styling">${data.type}</li>
                        <li class="appointment-styling">${data.clientId}</li>
                        <li class="appointment-styling">${data.catId}</li>
                    </ul>
                </div>
            </div>
        `
        appointmentContainer.append(appointmentCard);
    })
}

findAllAppointments()
 */