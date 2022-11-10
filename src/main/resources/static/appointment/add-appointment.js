const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



const appointmentConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const selectElement = document.getElementById('appointment-client-selection');

selectElement.addEventListener('change', (event) => {
    populateCatOptions('appointment-cat-selection', event.target.value)
});




const addAppointmentForm = document.getElementById('add-appointment-form')


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
            window.location.pathname = '/appointment/appointments.html';
        })

        .catch(err => console.error(err.message))
}

addAppointmentForm.addEventListener("submit", handleSubmit)





function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}