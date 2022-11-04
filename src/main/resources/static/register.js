// we need to store all of our different inputs into a variable so that we can reuse the info later
const registerForm = document.getElementById('register-form')



// base url and header
const registerConfig = {
    baseUrl:'http://localhost:8080/api/users',
    headers: {
        'Content-Type':'application/json'
    }
}



// handles form submission
// First, it needs to prevent the default behavior of the form
// Second, it needs to grab the value’s of the inputs and store them inside of an object that can then be used
// as the body for the POST request
// Third, it needs to actually make the request and handle the response accordingly.
// For quality of life we can also edit our UserServiceImpl to return a redirect URL string
// rather than the registration success message. When a User successfully registers, we can send back the URL
// for the Login page and then in our JavaScript we can redirect the window to the URL we received in the response.
const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        firstName: document.getElementById('register-firstName').value,
        lastName: document.getElementById('register-lastName').value,
        username: document.getElementById('register-username').value,
        password: document.getElementById('register-password').value
    }

    const response = await fetch(`${registerConfig.baseUrl}/register`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: registerConfig.headers
    })
        .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if (response.status === 200){
        window.location.replace(responseArr[0])
    }
}

registerForm.addEventListener("submit", handleSubmit)