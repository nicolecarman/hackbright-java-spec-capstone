const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



const appointmentConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const addAppointmentBtn = document.getElementById('add-appointment-btn')


addAppointmentBtn.addEventListener("mouseover", mouseover)
addAppointmentBtn.addEventListener("mouseout", mouseout)


function mouseover() {
    addAppointmentBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addAppointmentBtn.setAttribute("style", "background-color:#62929E")
}




addAppointmentBtn.addEventListener("click", function() {
    document.location.href = 'add-appointment.html'
})




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
        const prevTime = data.time
        const type = data.type
        const clientId = data.clientId
        const catId = data.catId


        const convertTime = (time) => {
            let hour = (time.split(':'))[0]
            let min = (time.split(':'))[1]
            let part = hour > 12 ? 'pm' : 'am';

            min = (min+'').length == 1 ? `0${min}` : min;
            hour = hour > 12 ? hour - 12 : hour;
            hour = (hour+'').length == 1 ? `0${hour}` : hour;

            return (`${hour}:${min} ${part}`)
        }

        const time = convertTime(prevTime)


        async function getClientName(clientId) {
            await fetch(`${appointmentConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: appointmentConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                     const firstName = data.firstName
                     const lastName = data.lastName


                        async function getCatName(catId) {
                            await fetch(`${appointmentConfig.baseUrl}/cats/${catId}`, {
                                method: "GET",
                                headers: appointmentConfig.headers
                            })
                                .then(response => response.json())
                                .then(data => {
                                    const name = data.name


                                    let appointmentCard = document.createElement("div")

                                    appointmentCard.classList.add("appointment")
                                    appointmentCard.innerHTML = `
                                    <div class="appointment-card">
                                         <ul class="appointment-styling">
                                              <li style="width: 100px">${date}</li>
                                              <li style="width: 100px">${time}</li>
                                              <li style="width: 500px">${type} for ${name} (Parent: ${firstName} ${lastName})</li>
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






async function handleDeleteAppointment(appointmentId){
    await fetch(`${appointmentConfig.baseUrl}/appointments/` + appointmentId, {
        method: "DELETE",
        headers: appointmentConfig.headers
    })
        .catch(err => console.error(err))

    return findAllAppointments();
}






function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}