async function populateCatOptions(selectElementId, clientId) {
    await fetch('/api/cats/options?' + new URLSearchParams({clientId: clientId}), {
        method: "GET",
        headers: {'Content-Type':'application/json'}
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
        .catch(err => console.error(err))
}