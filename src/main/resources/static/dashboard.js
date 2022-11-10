const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



const dashboardConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const welcomeText = document.getElementById("welcomeText");


async function getFirstName(userId) {
    await fetch(`${dashboardConfig.baseUrl}/users/${userId}`, {
        method: "GET",
        headers: dashboardConfig.headers
    })
        .then(response => response.json())
        .then(data => populateWelcome(data))
        .catch(err => console.error(err))
}




const populateWelcome = (data) =>{
    welcomeText.innerText = ''
    welcomeText.innerText = "Welcome, " + data.firstName + "!";
}

getFirstName(userId);




const submitForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container")




const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("note-input").value
    }
    await addNote(bodyObj);
    document.getElementById("note-input").value = ''
}

submitForm.addEventListener("submit", handleSubmit)




async function addNote(obj) {
    const response = await fetch(`${dashboardConfig.baseUrl}/notes/user/${userId}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: dashboardConfig.headers
    })
        .catch(err => console.error(err.message))
        if (response.status == 200) {
        return getNotes(userId);
    }
}




async function getNotes(userId) {
    await fetch(`${dashboardConfig.baseUrl}/notes/user/${userId}`, {
        method: "GET",
        headers: dashboardConfig.headers
    })
        .then(response => response.json())
        .then(data => createNoteCards(data))
        .catch(err => console.error(err))
}

getNotes(userId);





const createNoteCards = (array) => {
    noteContainer.innerHTML = ''
    array.forEach(data => {
        let noteCard = document.createElement("div")
        noteCard.classList.add("note")
        noteCard.innerHTML = `

            <div class="note-card">
                <p class="notes-styling">- ${data.body} <text class="delete-note" onclick="handleDelete(${data.id})">delete</text></p>
            </div>`

        noteContainer.append(noteCard);
    })
}




async function handleDelete(noteId){
    await fetch(`${dashboardConfig.baseUrl}/notes/` + noteId, {
        method: "DELETE",
        headers: dashboardConfig.headers
    })
        .catch(err => console.error(err))

    return getNotes(userId);
}




function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}