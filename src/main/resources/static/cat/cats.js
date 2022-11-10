const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];




const catConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const addCatBtn = document.getElementById('add-cat-btn')


addCatBtn.addEventListener("mouseover", mouseover)
addCatBtn.addEventListener("mouseout", mouseout)


function mouseover() {
    addCatBtn.setAttribute("style", "background-color:#546A7B")
}

function mouseout() {
    addCatBtn.setAttribute("style", "background-color:#62929E")
}


addCatBtn.addEventListener("click", function() {
    document.location.href = 'add-cat.html'
})





const catContainer = document.getElementById("cat-container")

async function findAllCats() {
    await fetch(`${catConfig.baseUrl}/cats`, {
        method: "GET",
        headers: catConfig.headers
    })
        .then(response => response.json())
        .then(data => createCatCards(data))
        .catch(err => console.error(err))
}

findAllCats()




const createCatCards = (array) => {
    catContainer.innerHTML = ''

    array.forEach(data => {
        const catId = data.id
        const name = data.name
        const age = data.age
        const gender = data.gender
        const breed = data.breed
        const pattern = data.pattern
        const color = data.color
        const altered = data.altered
        const vaccine = new Date(data.vaccine).toLocaleDateString()
        const notes = data.notes
        const clientId = data.clientId


        async function getClientName(clientId) {
            await fetch(`${catConfig.baseUrl}/clients/${clientId}`, {
                method: "GET",
                headers: catConfig.headers
            })
                .then(response => response.json())
                .then(data => {
                    const firstName = data.firstName
                    const lastName = data.lastName


                    let catCard = document.createElement("div")

                    catCard.classList.add("cat")
                    catCard.innerHTML = `
                                    <div class="cat-card">
                                         <ul class="cat-styling">
                                              <li style="font-size: 17px; width: 125px">${name}, ${age}, ${gender}</li>
                                              <li style="font-size: 17px; width: 100px">${breed}</li>
                                              <li style="font-size: 17px; width: 100px">${pattern}</li>
                                              <li style="font-size: 17px; width: 100px;">${color}</li>
                                              <li style="font-size: 17px; width: 75px">${altered}</li>
                                              <li style="font-size: 17px; width: 100px">${vaccine}</li>
                                              <li style="font-size: 17px; width: 150px;">${firstName + " " + lastName}</li><br>
                                              <li style="font-size: 17px">Notes: ${notes}</li>
                                              <li><text class="delete" onclick="handleDeleteCat(${catId})">delete</text></li>
                                         </ul>
                                    </div>`

                    catContainer.append(catCard);
                })

        }

        getClientName(clientId)

    })

}





async function handleDeleteCat(catId){
    await fetch(`${catConfig.baseUrl}/cats/` + catId, {
        method: "DELETE",
        headers: catConfig.headers
    })
        .catch(err => console.error(err))

    return findAllCats();
}





function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}