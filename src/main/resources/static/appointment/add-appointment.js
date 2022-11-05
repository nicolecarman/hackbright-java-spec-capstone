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




// gets DOM object (the client dropdown menu) and applies an event listener to the selection
// that the user makes. In other words, it pulls the cats of whatever client the user clicks on
const selectElement = document.getElementById('appointment-client-selection');

selectElement.addEventListener('change', (event) => {
    populateCatOptions('appointment-cat-selection', event.target.value)
});




// Pulls add appointment form from add-appointment.html
const addAppointmentForm = document.getElementById('add-appointment-form')

// add appointment
const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
        type: document.querySelector('input[name="appointment-type"]:checked').value,
        notes: document.getElementById('appointment-note').value,
        clientId: document.getElementById('appointment-client-selection').value,
        catId: document.getElementById('appointment-cat-selection').value
    }

    const response = await fetch(`${appointmentConfig.baseUrl}/appointments/add-appointment`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: appointmentConfig.headers
    })
        .then(response => response.json())

        .then(data => {
            console.log(data);
            window.location.pathname = '/appointments.html';
        })

        .catch(err => console.error(err.message))
}

addAppointmentForm.addEventListener("submit", handleSubmit)