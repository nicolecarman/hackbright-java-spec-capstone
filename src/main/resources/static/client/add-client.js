const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];




const clientConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const addClientForm = document.getElementById('add-client-form')


const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        firstName: document.getElementById('client-fname').value,
        lastName: document.getElementById('client-lname').value,
        address: document.getElementById('client-address').value,
        city: document.getElementById('client-city').value,
        state: document.getElementById('client-state').value,
        zipcode: document.getElementById('client-zipcode').value,
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





function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}