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



/*
// Not working. Won't display client first and last name
// GETS CLIENT NAME
async function getClientName(clientId) {
    await fetch(`${appointmentConfig.baseUrl}/clients/${clientId}`, {
        method: "GET",
        headers: appointmentConfig.headers
    })
        .then(response => response.json())
        .then(data => populateClientName(data))
        .catch(err => console.error(err))
}



// this accepts an object as an argument and uses that object to populate the fields
// within the modal as well as assign a custom "data-" tag to the "Save" button element
const clientName = document.getElementsByClassName("card-client");

const populateClientName = (data) =>{
    clientName.innerText = data.firstName + data.lastName;
    console.log(data.firstName)

}
*/
