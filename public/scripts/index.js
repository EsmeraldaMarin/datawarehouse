//varibles globales

let body = document.querySelector('body')
let urlRegions = 'http://localhost:3000/regions';
let urlCountries = 'http://localhost:3000/countries';
let urlCities = 'http://localhost:3000/cities';
let urlCompanies = 'http://localhost:3000/companies';



//arrow down

let arrowDown = document.getElementById('displayFilter');

arrowDown.addEventListener('click', (e) => {
    let searchSection = document.getElementById('searchSection')
    searchSection.classList.toggle('active')
})



//select all conctacts function

let selectAllContactsBtn = document.getElementById('selectAllContacts')

selectAllContactsBtn.addEventListener('change', () => {
    let contacts = document.querySelectorAll('#selectContact')

    if (selectAllContactsBtn.checked) {
        contacts.forEach(el => {
            el.parentNode.parentNode.classList.add("selected");
            el.checked = true
            el.addEventListener('change', () => {
                if (!el.checked) {
                    selectAllContactsBtn.checked = false
                }
            })
        })

    } else {
        contacts.forEach(el => {
            el.parentNode.parentNode.classList.remove("selected");
            el.checked = false
        })
    }

})

// importar contacto window

let impContactBtn = document.getElementById('impContact');

impContactBtn.addEventListener('click', () => {

    showWindow(importWindowHTML, 'closeImpContactBtn', 'bgImportContact')

})



//add contact window

let addContactBtn = document.getElementById('addContact')

addContactBtn.addEventListener('click', () => {

    showWindow(htmlTextAddContact, 'closeAddContactBtn', 'bgAddContact');
    let floatingInput = document.querySelectorAll('.form-control')
    let floatingInputCompany = document.querySelector('#floatingCompania');

    floatingInput.forEach(input => {
        input.addEventListener('keyup', () => {
            if (input.value) {
                input.classList.add("inputActive")
            } else {
                input.classList.remove("inputActive")
            }
        })
    })

    floatingInputCompany.addEventListener('change', () => {
        if (floatingInputCompany.value) {
            floatingInputCompany.classList.add("inputActive")
        } else {
            floatingInputCompany.classList.remove("inputActive")
        }
    })
    getOptionsOfDB(urlCompanies, floatingInputCompany, false)

    let imgPreview = document.getElementById('imgPreview');
    let imgUploader = document.getElementById('imgUploader');

    uploadImg(imgPreview, imgUploader)
    locationSelects()
    disableChannel()

    let inputRangeInteres = document.getElementById('interesInputAdd')
    inputRangeInteres.addEventListener('change', ()=>{
        if(inputRangeInteres.nextSibling){
            inputRangeInteres.nextSibling.remove()
        }
        inputRangeInteres.insertAdjacentHTML('afterend', `${inputRangeInteres.value}%`)
    })


})

//funcion selects dependientes

let countrieEventCreated = false;

function locationSelects() {

    let regionSelect = document.getElementById('regionSelectAdd');
    let countrySelect = document.getElementById('paisSelectAdd');
    let citySelect = document.getElementById('ciudadSelectAdd');
    let addressInput = document.getElementById('addressInputAdd');


    let region = getOptionsOfDB(urlRegions, regionSelect, false);
    region.then(regionsInfo => {


        regionSelect.addEventListener('change', (e) => {

            if (countrySelect.childNodes) {
                countrySelect.innerHTML = `<option>Seleccione un pais</option>`
            }
            if(citySelect.childNodes){
                citySelect.innerHTML = `<option>Seleccione una ciudad</option>`
            }

            let regionSelected = regionsInfo.find(reg => reg.name == regionSelect.value);
            let country = getOptionsOfDB(urlCountries, countrySelect, regionSelected);
            countrySelect.removeAttribute('disabled');


            country.then(countriesInfo => {

                addressInput.removeAttribute('disabled');

                if(!countrieEventCreated){
                    countrySelect.addEventListener('change', (e) => {

                        countrieEventCreated = true;
    
                        if (citySelect.childNodes) {
                            citySelect.innerHTML = `<option>Seleccione una ciudad</option>`
                        }
    
                        let countrySelected = countriesInfo.find(co => co.name == countrySelect.value);
                        let city = getOptionsOfDB(urlCities, citySelect, countrySelected);
                        citySelect.removeAttribute('disabled');
    
                        
                    })
                }
            });

        })
    })
}


//funcion opciones ubicacion add contacto

function getOptionsOfDB(url, ctn, parentLocation) {

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((info) => {

                info.forEach(el => {
                    if (parentLocation) {

                        if (parentLocation.name == el.region || parentLocation.name == el.country) {
                            let option = document.createElement('option')
                            option.textContent = el.name
                            option.value = el.name
                            ctn.appendChild(option)
                        }
                    } else {
                        let option = document.createElement('option')
                        option.textContent = el.name
                        option.value = el.name
                        ctn.appendChild(option)
                    }
                })
                resolve(info)
            })
    });

}

//function subir imagen

function uploadImg(imgP, imgU) {
    imgU.addEventListener('change', (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            imgP.src = e.target.result
        }
        reader.readAsDataURL(file)
    })
}
//funcion show Window

function showWindow(htmlText, btnId, ctnId) {
    body.insertAdjacentHTML('afterbegin', htmlText);

    let btnClose = document.getElementById(`${btnId}`);
    let container = document.getElementById(`${ctnId}`)

    btnClose.addEventListener('click', () => {
        container.remove()
    })
}

function disableChannel(){
    let btns = document.querySelectorAll('.disableChannel')
    btns.forEach(btn => {
        btn.addEventListener('click', (e)=>{
            let parent = e.target.parentNode;
            
            parent.classList.toggle("channelDisabled");
            let searchClass = parent.classList.contains("channelDisabled");

            if(searchClass){
                btn.insertAdjacentHTML('afterend', `<img src="assets/return.png" class="returnIcon"/>`);
                parent.childNodes[3].childNodes[1].setAttribute("disabled", "");
                parent.childNodes[5].childNodes[1].setAttribute("disabled", "");
            }else{
                btn.nextSibling.remove()
                parent.childNodes[3].childNodes[1].removeAttribute("disabled");
                parent.childNodes[5].childNodes[1].removeAttribute("disabled");
            }
        })
    })
}
