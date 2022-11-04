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