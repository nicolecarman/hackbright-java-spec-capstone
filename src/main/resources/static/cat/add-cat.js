const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];



const catConfig = {
    baseUrl:'http://localhost:8080/api',
    headers: {
        'Content-Type':'application/json'
    }
}




const addCatForm = document.getElementById('add-cat-form')


const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        name: document.getElementById('cat-name').value,
        breed: document.getElementById('cat-breed').value,
        age: document.getElementById('cat-age').value,
        pattern: document.getElementById('cat-pattern').value,
        color: document.getElementById('cat-color').value,
        gender: document.querySelector('input[name="cat-gender"]:checked').value,
        altered: document.querySelector('input[name="cat-altered"]:checked').value,
        vaccine: document.getElementById('cat-vaccine').value,
        notes: document.getElementById('cat-note').value,
        clientId: document.getElementById('client-cat-selection').value
    }

    const response = await fetch(`${catConfig.baseUrl}/cats/add-cat`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: catConfig.headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        window.location.pathname = '/cat/cats.html';
    }
}

addCatForm.addEventListener("submit", handleSubmit)




function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
