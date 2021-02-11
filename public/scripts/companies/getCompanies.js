let companiesSection = document.getElementById('companiesSection');


function getCompanies() {
    fetch(urlCompanies)
        .then(res => res.json())
        .then(info => {

            createCompanies(info)
        })
}
getCompanies()

function createCompanies(info) {
    createCompanyCards(info)

    let seeMoreInfoBtn = document.querySelectorAll('#seeMoreBtn')
    seeMoreInfoBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {

            let id = e.target.parentNode.id
            id = id.replace("company", "")
            let companySelected = info.find(comp => comp.id == id);
            showCompanyInfo(companySelected)
        })
    })
}

function createCompanyCards(info) {
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
}

function showCompanyInfo(companyInfo) {

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
    createContactsList(contactsSection, companyInfo.allContacts, "company")


}

