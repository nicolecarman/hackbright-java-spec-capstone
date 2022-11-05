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
    array.forEach(data => {
        // push data to new array
        const allAppointments = [];
        allAppointments.push(data);

        // DOESN'T WORK. DOESN'T GRAB FIRST 5 APPOINTMENTS
        // grab the first 5 things from our array and put it in new array, upcomingAppointments
        const upcomingAppointments = allAppointments.slice(0, 4);
        console.log(upcomingAppointments)


        // create HTML div
        const appointmentCard = document.createElement("div")


        // testing data access
        //console.log(upcomingAppointments[0].date)
        //console.log(upcomingAppointments[0].time)

        for (let i = 0; allAppointments[0].length < 5; i++) {
            appointmentCard.innerHTML = `
                     <div class="dashboard-appointment-card">
                             <ul class="appointment-styling">

                                 <li class="appointment-styling">${upcomingAppointments[0].date}</li>
                                 <li class="appointment-styling">${upcomingAppointments[0].time}</li>
                                 <li class="appointment-styling">${upcomingAppointments[0].type}</li>
                                 <li class="appointment-styling">${upcomingAppointments[0].clientId}</li>
                                 <li class="appointment-styling">${upcomingAppointments[0].catId}</li>
                             </ul>
                         </div>
                     </div>`
            dashboardAppointmentContainer.append(appointmentCard);
        }
    })
}
