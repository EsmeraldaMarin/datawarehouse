let companiesSection = document.getElementById('companiesSection');


function getCompanies() {
    fetch(urlCompanies)
        .then(res => res.json())
        .then(info => {
            info.forEach(comp => {
                let i = 0
                let newCompanyHtml = `<article class="company_card" id="company${comp.id}">
                    <h2>${comp.name}</h2>
                    <div class="seemore_card" id="seeMoreBtn">
                        Ver Info
                    </div>
                    <div class="info_company">
                        <span>Ubicación</span>
                        <p>${comp.country}, ${comp.region}</p>
                        <p>${comp.address}, ${comp.city}</p>

                    </div>
                    <div class="users_company">
                        <p>Todos los contactos</p>
                        <div id="contactsImages"></div>
                    </div>
                </article>`

                companiesSection.insertAdjacentHTML('beforeend', newCompanyHtml)

                comp.allContacts.forEach(contact => {

                    if (i > 7) {
                        return
                    }
                    //let img = ` <img src=${contact.img_url}alt="contactImg">`
                    let img = ` <img src="assets/avatar.png" alt="contactImg">`

                    let imgContainer = document.querySelector(`#company${comp.id} #contactsImages`);
                    imgContainer.insertAdjacentHTML('beforeend', img)

                    i++
                })
            })
            return info

        })
        .then(data => {

            let seeMoreInfoBtn = document.querySelectorAll('#seeMoreBtn')
            seeMoreInfoBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let id = e.target.parentNode.id
                    id = id.replace("company", "")
                    console.log(data[id - 1])
                    showCompanyInfo(data[id - 1])
                })
            })

        })
}
getCompanies()

function showCompanyInfo(companyInfo) {
    let classInteres;



    let htmlCompanyInfo =
        `<div class='bgInfoCompany' id='bgInfoCompany'>
        <div class='box_company'>
            <div class='close_btn' id='closeInfoCompany'>
                <img src='assets/button-close.svg' alt='close Button'>
            </div>
            <h2>${companyInfo.name}</h2>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                <p>${companyInfo.address}, ${companyInfo.city}, ${companyInfo.country}, ${companyInfo.region}</p>
            </div>
            <div class="contacts">
                <div>
                    <i class="fas fa-users"></i>
                    <p>Contactos</p>
                </div>
                <ul class="contactsUl" id="contactsCompanyUl">
                    
                </ul>
            </div>
        </div>
    </div>`

    showWindow(htmlCompanyInfo, 'closeInfoCompany', 'bgInfoCompany');
    let contactsSection = document.getElementById('contactsCompanyUl')

    if (companyInfo.allContacts.length == 0) {
        contactsSection.classList.add('noContacts')
        contactsSection.innerHTML = `<span>No hay contactos para mostrar</span>`
    } else {

        contactsSection.classList.remove('noContacts');
        contactsSection.innerHTML = ``
        companyInfo.allContacts.forEach(contact => {

            switch (contact.interest) {
                case 100:
                    classInteres = "onehundred";
                    break;
                case 75:
                    classInteres = "seventyfive";
                    break;

                case 50:
                    classInteres = "fifty";
                    break;
                case 25:
                    classInteres = "twentyfive";
                    break;
                case 0:
                    classInteres = "cero";
                    break;
            }

            //cambiar la img
            let contactHtml = `
            <li>
                <img src="assets/avatar.png" alt="contactImage">
                <div class="infoContact">
                    <p>${contact.name} ${contact.lastname}</p>
                    <p class="email">${contact.email}</p>
                </div>
                <p class="cargo">${contact.position}</p>
                <div class="interes ${classInteres}">
                    <div class="bg_line"></div>
                    <div class="color_line"></div>
                </div>
            </li>
            `
            contactsSection.insertAdjacentHTML('beforeend', contactHtml)
        })
    }


}
