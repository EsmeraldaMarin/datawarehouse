let addUserBtn = document.getElementById("addUser");

addUserBtn.addEventListener("click", () => {
    showWindow(htmlTextAddUser, "closeAddUserBtn", "bgAddUser");

    let floatingInput = document.querySelectorAll(".form-control");
    let cancelBtn = document.getElementById("cancelBtn");
    let form = document.getElementById('form');

    floatingInput.forEach((input) => {
        inputLabels(input)
    });

    cancelBtn.addEventListener("click", () => {
        let ctn = document.getElementById("bgAddUser");
        body.classList.remove('modalActive')
        ctn.remove();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        let formData = new FormData(e.currentTarget)
        let params = {
            method: 'POST',
            type: 'no-cors',
            body: formData
        };

        for (var pair of formData.entries()) {

            if (pair[1] == "") {
                console.log("falta rellenar el campo de " + pair[0])
                return
            }
        }
        fetch(urlUsers, params)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.reload()
            })
            .catch(err => console.log(err))


    });
});
