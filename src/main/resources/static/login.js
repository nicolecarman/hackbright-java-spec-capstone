let loginForm = document.getElementById('login-form')



const loginConfig = {
    baseUrl:'http://localhost:8080/api/users',
    headers: {
        'Content-Type':'application/json'
    }
}




const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value
    }

    const response = await fetch(`${loginConfig.baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: loginConfig.headers
    })
        .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if (response.status === 200){
        document.cookie = `userId=${responseArr[1]}`
        window.location.replace(responseArr[0])
    }
}

loginForm.addEventListener("submit", handleSubmit)