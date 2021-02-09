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

    /* let seeMoreInfoBtn = document.querySelectorAll('#seeMoreBtn')
    seeMoreInfoBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {

            let id = e.target.parentNode.id
            id = id.replace("regions", "")
            let regionsSelected = info.find(comp => comp.id == id);
            showRegionsInfo(regionsSelected)
        })
    }) */
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
                let liCity = `<li><span>${cit.name}</span>
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
