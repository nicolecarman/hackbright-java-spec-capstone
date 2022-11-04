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
    welcomeText.innerText = "Welcome, " + data.firstName;
}

getFirstName(userId);




// DOM elements we're grabbing
const submitForm = document.getElementById("note-form")
const noteContainer = document.getElementById("note-container")



// modal elements
let noteBody = document.getElementById(`note-body`)
let updateNoteBtn = document.getElementById('update-note-button')



// handles form submission that adds a note
const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: document.getElementById("note-input").value
    }
    await addNote(bodyObj);
    document.getElementById("note-input").value = ''
}



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



// deletes a note
async function handleDelete(noteId){
    await fetch(dashboardConfig + noteId, {
        method: "DELETE",
        headers: dashboardConfig.headers
    })
        .catch(err => console.error(err))

    return getNotes(userId);
}



// this GET request is for the specific note that the user wants to edit
async function getNoteById(noteId){
    await fetch(dashboardConfig + noteId, {
        method: "GET",
        headers: dashboardConfig.headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}



// edits note
async function handleNoteEdit(noteId){
    let bodyObj = {
        id: noteId,
        body: noteBody.value
    }

    await fetch(dashboardConfig, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: dashboardConfig.headers
    })
        .catch(err => console.error(err))

    return getNotes(userId);
}



// this clears the cookie we created for the logged in user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}



// createNoteCards is an array of objects. this loops through and creates a note card for each item
// and appends it to our container for the notes
const createNoteCards = (array) => {
    noteContainer.innerHTML = ''
    array.forEach(obj => {
        let noteCard = document.createElement("div")
        noteCard.classList.add("m-2")
        noteCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                    <p class="card-text">${obj.body}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getNoteById(${obj.id})" type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#note-edit-modal">
                        Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        noteContainer.append(noteCard);
    })
}



// this accepts an object as an argument and uses that object to populate the fields
// within the modal as well as assign a custom "data-" tag to the "Save" button element
const populateModal = (obj) =>{
    noteBody.innerText = ''
    noteBody.innerText = obj.body
    updateNoteBtn.setAttribute('data-note-id', obj.id)
}



// invoke getNotes method, add event listeners, and adds "onclick" to logout button on home.html
getNotes(userId);


submitForm.addEventListener("submit", handleSubmit)


updateNoteBtn.addEventListener("click", (e)=>{
    let noteId = e.target.getAttribute('data-note-id')
    handleNoteEdit(noteId);
})