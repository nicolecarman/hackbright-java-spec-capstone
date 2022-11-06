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
    const date = upcomingAppointments[i].date;
    const time = upcomingAppointments[i].time;
    const type = upcomingAppointments[i].type;
    const clientId = upcomingAppointments[i].clientId;
    const catId = upcomingAppointments[i].catId;


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
                                    <ul class="appointment-styling">
                                        <li class="appointment-styling">${date}</li>
                                        <li class="appointment-styling">${time}</li>
                                        <li class="appointment-styling">${type}</li>
                                        <li class="appointment-styling">${firstName} ${lastName}</li>
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