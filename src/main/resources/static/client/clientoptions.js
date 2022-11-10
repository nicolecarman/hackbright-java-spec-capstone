async function populateClientOptions(selectElementId) {
    await fetch(`/api/clients/options`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })

        .then(response => response.json())

        .then(data => {
            let optionElements = document.getElementById(selectElementId).options;

            data.forEach(option =>
                optionElements.add(
                    new Option(option.text, option.value, option.selected)
                )
            );
        })
}
