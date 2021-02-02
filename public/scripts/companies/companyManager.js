let addCompanyBtn = document.getElementById('addCompany');

addCompanyBtn.addEventListener('click', () => {

    showWindow(htmlTextAddCompany, "closeAddCompanyBtn", "bgAddCompany");

    let ctn = document.getElementById("bgAddCompany");
    let floatingInputs = document.querySelectorAll('.form-floating input')
    let regionSelect = document.getElementById("regionSelectAdd");
    let countrySelect = document.getElementById("paisSelectAdd");
    let citySelect = document.getElementById("ciudadSelectAdd");
    let addressInput = document.getElementById("addressInputAdd");
    let form = document.getElementById('form');
    let cancelBtn = document.getElementById("cancelBtn");

    locationSelects(regionSelect, countrySelect, citySelect, addressInput);

    floatingInputs.forEach(input => {
        inputLabels(input)
    })

    cancelBtn.addEventListener("click", () => {
        ctn.remove();
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        floatingInputs.forEach(input => {
            input.value = input.value.toLowerCase()
        })
        addressInput.value = addressInput.value.toLowerCase()

        let formData = new FormData(e.currentTarget)
        let params = {
            method: 'POST',
            type: 'no-cors',
            body: formData
        };
        if (formData.has('name') && formData.has('email') && formData.has('phone') && formData.has('city_id') && formData.has('address')) {
            fetch(urlCompanies, params)
                .then(res => res.json())
                .catch(err => console.log(err))
                .then(data => {
                    console.log(data)
                    ctn.classList.add('createdContact')
                    form.innerHTML = `<span>¡Compañía Creada!</span>`;
                    setTimeout(function(){ ctn.remove(); }, 2000);
                })
        }else{
            console.log('falta informacion')
        }
    })
})