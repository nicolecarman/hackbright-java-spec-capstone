// base url and header
const dashboardAppointmentConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}



// GET ALL APPOINTMENTS for appointments.html
const dashboardAppointmentContainer = document.getElementById("dashboard-appointment-container")

async function findAllAppointments() {
    await fetch(`${dashboardAppointmentConfig.baseUrl}/appointments`, {
        method: "GET",
        headers: dashboardAppointmentConfig.headers
    })
        .then(response => response.json())
        .then(data => createAppointmentCards(data))
        .catch(err => console.error(err))
}




const createAppointmentCards = (array) => {
    array.forEach(data => {
        // push data to new array
        const appointmentDetails = [];
        appointmentDetails.push(data);

        // create HTML div
        const appointmentCard = document.createElement("div")

        // splice the first 10 things from our array
        // new sliced array is in upcomingAppointments
        const upcomingAppointments = appointmentDetails.slice(0, 10);

        // testing data access
        //console.log(upcomingAppointments[0].date)
        //console.log(upcomingAppointments[0].time)

        // doesn't work, prints "object"
        //dashboardAppointmentContainer.append(upcomingAppointments);
        //console.log(dashboardAppointmentContainer)

        appointmentCard.innerHTML = upcomingAppointments[0].date

        appointmentCard.innerHTML = `
                     <div class="dashboard-appointment-card">
                             <ul class="appointment-styling">

                                 <li class="appointment-styling">${upcomingAppointments[0].date}</li>
                                 <li class="appointment-styling">${data.time}</li>
                                 <li class="appointment-styling">${data.type}</li>
                                 <li class="appointment-styling">${data.clientId}</li>
                                 <li class="appointment-styling">${data.catId}</li>
                             </ul>
                         </div>
                     </div>
                 `
        dashboardAppointmentContainer.append(appointmentCard);
    })
}

findAllAppointments()