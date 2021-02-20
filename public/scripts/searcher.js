function searcherFunction(url, input, section) {
    let busqueda = input.value;
    busqueda = busqueda.replace(/ /g, "");
    busqueda = busqueda.toLowerCase();
    if (busqueda == "") {
        return
    }
    let response = []

    let termSearched = document.getElementById('termSearched');
    let termParent = input.parentNode.parentNode.parentNode;
    if (termSearched) {
        termParent.querySelector('.searchTerms').remove()
        termParent.insertAdjacentHTML('beforeend', `<ul class="searchTerms"><li><a>Todos los resultados</a></li><li id= "termSearched">${busqueda}</li></ul>`);
    } else {
        termParent.insertAdjacentHTML('beforeend', `<ul class="searchTerms"><li><a>Todos los resultados</a></li><li id= "termSearched">${busqueda}</li></ul>`);
    }
    let a = termParent.querySelector('.searchTerms a');
    a.addEventListener('click', () => {
        location.reload()
    })

    fetch(url)
        .then(res => res.json())
        .then(info => {

            let wordLength = busqueda.length
            function searchTerms(contact, propiedad) {
                propiedad = propiedad.toLowerCase()
                if (propiedad.substring(0, wordLength) == busqueda) { response.push(contact) }
            }

            if (url == urlContacts) {
                searchContact(info)
            } else if (url == urlCompanies) {
                searchCompany(info)
            } else if (url == urlAllLocation) {
                searchLocation(info)
            }
            function searchContact(info) {
                info.forEach(contact => { searchTerms(contact, contact.name + contact.lastname) });
                info.forEach(contact => { searchTerms(contact, contact.name) });
                info.forEach(contact => { searchTerms(contact, contact.lastname) });
                info.forEach(contact => { searchTerms(contact, contact.email) });
                info.forEach(contact => { searchTerms(contact, contact.company) });
                info.forEach(contact => { searchTerms(contact, contact.position) });
                info.forEach(contact => { searchTerms(contact, contact.country) });
                info.forEach(contact => { searchTerms(contact, contact.region) });
                info.forEach(contact => { searchTerms(contact, contact.address) });
            }
            function searchCompany(info) {
                info.forEach(company => { searchTerms(company, company.name) });
                info.forEach(company => { searchTerms(company, company.email) });
                info.forEach(company => { searchTerms(company, company.city) });
                info.forEach(company => { searchTerms(company, company.country) });
                info.forEach(company => { searchTerms(company, company.region) });
                info.forEach(company => { searchTerms(company, company.address) });
            }
            function searchLocation(info) {
                info.forEach(loc => { searchTerms(loc, loc.name) });
            }

            //si hay un contacto repetido, solo selecciona el primero
            response = response.filter((item, index) => {
                return response.indexOf(item) === index;
            })

            return response

        }).then((res) => {

            if (res.length == 0) {
                sinResultados(section, busqueda)
                return
            }
            section.innerHTML = ``

            if (url == urlContacts) {
                createContacts(res)
            } else if (url == urlCompanies) {
                createCompanies(res)
            } else if (url == urlAllLocation) {
                createLocationCards(res)
            }
        })
}
function sinResultados(ctn, busqueda) {
    ctn.innerHTML = `
    <div class="not_found">
        <h3>Ups!</h3>
        <img src="assets/not_found.svg" alt="contact not found image">
        <p>No hay resultados para</p>
        <p class="palabra">"${busqueda}"</p>
    </div>
    `
}