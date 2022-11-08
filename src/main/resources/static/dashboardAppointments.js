// base url and header
const dashboardAppointmentConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}



// GET ALL APPOINTMENTS for appointments.html
const dashboardAppointmentContainer = document.getElementById("dashboard-appointment-container")

async function findUpcomingAppointments() {
    await fetch(`${dashboardAppointmentConfig.baseUrl}/appointments`, {
        method: "GET",
        headers: dashboardAppointmentConfig.headers
    })
        .then(response => response.json())
        .then(data => createUpcomingAppointmentCards(data))
        .catch(err => console.error(err))
}

findUpcomingAppointments()




const createUpcomingAppointmentCards = (array) => {
    let upcomingAppointments = array.slice(0, 5)

    for (let i = 0; i < upcomingAppointments.length; i++) {
    // save appointment info to variables
    const date = new Date(upcomingAppointments[i].date).toLocaleDateString()
    const prevTime = upcomingAppointments[i].time
    const type = upcomingAppointments[i].type
    const clientId = upcomingAppointments[i].clientId
    const catId = upcomingAppointments[i].catId

        // convert time from 24hr to 12hr
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


        // gets client's name using the client id we grabbed from the appointment
        async function getClientName(clientId) {
            await fetch(`${dashboardAppointmentConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: dashboardAppointmentConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                    // save client's name into variables
                    const firstName = data.firstName;
                    const lastName = data.lastName;


                    // gets cat's name using the cat id we grabbed from the appointment
                    async function getCatName(catId) {
                        await fetch(`${dashboardAppointmentConfig.baseUrl}/cats/${catId}`, {
                            method: "GET",
                            headers: dashboardAppointmentConfig.headers
                        })
                            .then(response => response.json())
                            .then(data => {

                                // save cat's name into variable
                                const catName = data.name;


                                // append all of the appointment info to the cards on appointments.html
                                const appointmentCard = document.createElement("div")

                                appointmentCard.classList.add("appointment")
                                appointmentCard.innerHTML = `
                                <div class="dashboard-appointment-card">
                                    <ul style="padding-left: 10px">
                                        <li style="font-size: 16px; width: 80px;">${date}</li>
                                        <li style="font-size: 16px; padding-right: 30px">${time}</li>
                                        <li style="font-size: 16px; width: 110px;">${type}</li>
                                        <li class="appointment-styling" style="padding-right: 25px">${firstName} ${lastName}
                                        <li class="appointment-styling">${catName}</li>
                                    </ul>
                                </div>`

                                dashboardAppointmentContainer.append(appointmentCard);
                            })
                            .catch(err => console.error(err))
                    }
                    getCatName(catId)

                })
                .catch(err => console.error(err))
        }
        getClientName(clientId)
    }

}




// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}