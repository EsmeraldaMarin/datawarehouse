let regionsSection = document.getElementById('regionsSection');


function getRegions() {
    fetch(urlRegions)
        .then(res => res.json())
        .then(info => {

            createRegions(info)
        })
}
getRegions()

function createRegions(info) {
    createRegionsCards(info)


    let btnsSeeMore = document.querySelectorAll('.btn_seeinfo')
    btnsSeeMore.forEach(btn => {
        btn.addEventListener('click', (e) => {

            let id = e.target.parentNode.id

            if (id.charAt(0) == 'r') {

                id = id.replace("region", "")
                fetch(`${urlRegions}/${id}`)
                    .then(res => res.json())
                    .then(info => {
                        showLocationInfo(info[0])

                    })


            } else if (id.charAt(1) == 'o') {
                console.log('esto es un pais')
            } else if (id.charAt(1) == 'i') {
                console.log('esto es una ciudad')
            }

            /* id = id.replace("regions", "")
            let regionsSelected = info.find(comp => comp.id == id);
             */
        })
    })
}

function createRegionsCards(info) {
    info.forEach(reg => {

        let liRegion;
        if (reg.allCountries.length == 0) {
            liRegion = `<li class="regions_card" id="region${reg.id}">
                <span>${reg.name}</span>
                <button class="btn_seeinfo">Ver Info</button>
                <div class="acciones">
                    <i class="dots">•••</i>
                    <i class="fas fa-trash trash"></i>
                    <i class="fas fa-edit edit"></i>
                </div>
            </li>`
        } else {
            liRegion = `<li class="regions_card" id="region${reg.id}">
                <span class="caret">${reg.name}</span>
                <button class="btn_seeinfo">Ver Info</button>
                <ul class="nested">
                </ul>
                <div class="acciones">
                    <i class="dots">•••</i>
                    <i class="fas fa-trash trash"></i>
                    <i class="fas fa-edit edit"></i>
                </div>
            </li>`
        }
        regionsSection.insertAdjacentHTML('beforeend', liRegion);



        let ulCountry = document.querySelector(`#region${reg.id} >ul`)

        reg.allCountries.forEach(con => {
            let liCountry;
            if (con.allCities.length == 0) {
                liCountry = `<li id="country${con.id}">
                    <span>${con.name}</span>
                    <div class="accionesFixed">
                        <i class="fas fa-trash trash"></i>
                        <i class="fas fa-edit edit"></i>
                    </div>
                    <button class="btn_seeinfo">Ver Info</button>
                </li>`
            } else {
                liCountry = `<li id="country${con.id}">
                    <span class="caret">${con.name}</span>
                    <div class="accionesFixed">
                        <i class="fas fa-trash trash"></i>
                        <i class="fas fa-edit edit"></i>
                    </div>
                    <button class="btn_seeinfo">Ver Info</button>
                    <ul class="nested">
                    </ul>
                </li>`
            }
            ulCountry.insertAdjacentHTML('beforeend', liCountry);

            let ulCity = document.querySelector(`#country${con.id} >ul`)

            con.allCities.forEach(cit => {
                let liCity = `<li id="city${cit.id}"><span>${cit.name}</span>
                    <button class="btn_seeinfo">Ver Info</button>
                    <div class="accionesFixed">
                        <i class="fas fa-trash trash"></i>
                        <i class="fas fa-edit edit"></i>
                    </div>
                </li>`

                ulCity.insertAdjacentHTML('beforeend', liCity);

            })


        })

    })
    let actionsBtn = document.querySelectorAll(".acciones");
    actionsBtn.forEach(ac => {
        ac.addEventListener('mouseover', (e) => {
            ac.classList.add('active')
            ac.addEventListener('mouseout', (e) => {
                ac.classList.remove('active')
            })
        })
    })
    treeView()
}

function showLocationInfo(info) {
    //intentar sacar algo de la funcion de get companies
    console.log(info)
    let htmlLocationInfo =
        `<div class='bgInfoLocation' id='bgInfoLocation'>
            <div class='box_location'>
                <div class='close_btn' id='closeInfoLocation'>
                    <img src='assets/button-close.svg' alt='close Button'>
                </div>
                <h2>${info.name}</h2>
                
                <div class="contacts">
                    <div>
                        <i class="fas fa-users"></i>
                        <p>Contactos</p>
                    </div>
                    <ul class="contactsUl" id="contactsLocationUl">
                        
                    </ul>
                </div>
                <div class="companies">
                    <div>
                        <i class="fas fa-building"></i>
                        <p>Compañías</p>
                    </div>
                    <ul class="companiesUl" id="companiesLocationUl">
                        
                    </ul>
                </div>
            </div>
        </div>`

    showWindow(htmlLocationInfo, 'closeInfoLocation', 'bgInfoLocation');
    let contactsSection = document.getElementById('contactsLocationUl');
    let companiesSection = document.getElementById('companiesLocationUl');
    createContactsList(contactsSection, info.allContacts, "location")
    createCompaniesList(companiesSection, info.allCompanies)
}

function createCompaniesList(ctn, allCompaniesInfo) {
  
    if (allCompaniesInfo.length == 0) {
      ctn.classList.add('noCompanies')
      ctn.innerHTML = `<span>No hay compañías para mostrar</span>`
    } else {
  
      ctn.classList.remove('noCompanies');
      ctn.innerHTML = ``
      allCompaniesInfo.forEach(company => {
  
    let companyHtml = `
            <li id="company${company.id}" class = "companyLi">

                <p class="comName">${company.name}</p>
                <p class="comEmail"><i class="fas fa-envelope"></i>${company.email}</p>
                <p class="comPhone"><i class="fas fa-phone-square-alt"></i>${company.phone}</p>
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>${company.city}</p>
                    <p class="address">${company.address}</p>
                </div>
               
            </li>
            `
        ctn.insertAdjacentHTML('beforeend', companyHtml);
  
      })
    }
  
  }