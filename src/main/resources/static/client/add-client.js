// cookie to read in order to get the logged in user's id
// logout method will clear the cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



// base url and header
const clientConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




// Pulls add client form from add-client.html
const addClientForm = document.getElementById('add-client-form')

// add client
const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        firstName: document.getElementById('client-fname').value,
        lastName: document.getElementById('client-lname').value,
        address: document.getElementById('client-address').value,
        city: document.getElementById('client-city').value,
        state: document.getElementById('client-state').value,
        phone: document.getElementById('client-number').value,
        email: document.getElementById('client-email').value
    }

    const response = await fetch(`${clientConfig.baseUrl}/clients/add-client`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: clientConfig.headers
    })
        .catch(err => console.error(err.message))
        if (response.status == 200) {
            window.location.pathname = '/client/clients.html';
        }
}

addClientForm.addEventListener("submit", handleSubmit)





// Clears user cookies and logs out user
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}