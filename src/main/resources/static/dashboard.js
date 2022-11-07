// cookie to read in order to get the logged in user's id
// logout method will clear the cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



// base url and header
const dashboardConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




// GETS FIRST NAME AND DISPLAYS IT IN WELCOME MESSAGE on dashboard.html
// pull element
const welcomeText = document.getElementById("welcomeText");

// gets user's first name and appends it to HTML
async function getFirstName(userId) {
    await fetch(`${dashboardConfig.baseUrl}/users/${userId}`, {
        method: "GET",
        headers: dashboardConfig.headers
    })
        .then(response => response.json())
        .then(data => populateWelcome(data))
        .catch(err => console.error(err))
}



// this accepts an object as an argument and uses that object to populate the fields
// within the modal as well as assign a custom "data-" tag to the "Save" button element
const populateWelcome = (data) =>{
    welcomeText.innerText = ''
    welcomeText.innerText = "Welcome, " + data.firstName + "!";
}

getFirstName(userId);




// DOM elements we're grabbing
const submitForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container")



// handles form submission that adds a note
const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("note-input").value
    }
    await addNote(bodyObj);
    document.getElementById("note-input").value = ''
}

submitForm.addEventListener("submit", handleSubmit)




// the post request that actually adds the note
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



// gets all of the user's notes, creates cards for them, and appends them to a container to hold them
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




// createNoteCards is an array of objects. this loops through and creates a note card for each item
// and appends it to our container for the notes
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




// deletes a note
async function handleDelete(noteId){
    await fetch(`${dashboardConfig.baseUrl}/notes/` + noteId, {
        method: "DELETE",
        headers: dashboardConfig.headers
    })
        .catch(err => console.error(err))

    return getNotes(userId);
}




// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}