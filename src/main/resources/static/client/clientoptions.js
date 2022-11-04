async function populateClientOptions(selectElementId) {
    await fetch(`/api/clients/options`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
        // The json() method of the Response interface takes a Response stream and reads it to completion.
        // It returns a promise which resolves with the result of parsing the body text as JSON.
        .then(response => response.json())

        .then(data => {
            let optionElements = document.getElementById(selectElementId).options;

            data.forEach(option =>
                optionElements.add(
                    new Option(option.text, option.value, option.selected)
                )
            );
        })
        .catch(err => console.error(err))
}
