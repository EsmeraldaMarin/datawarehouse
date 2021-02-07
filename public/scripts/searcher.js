function searcherFunction(url, input, section) {
    let busqueda = input.value;
    busqueda = busqueda.replace(/ /g, "");
    busqueda = busqueda.toLowerCase();
    if (busqueda == "") {
        return
    }
    let response = []

    input.parentNode.parentNode.parentNode.insertAdjacentHTML('beforeend', `<ul class="searchTerms"><li><a href="index.html">Todos los resultados</a></li><li>${busqueda}</li></ul>`);

    fetch(url)
        .then(res => res.json())
        .then(info => {

            let wordLength = busqueda.length
            function searchTerms(contact, propiedad) {
                if (propiedad.substring(0, wordLength) == busqueda) { response.push(contact) }
            }

            if (url == urlContacts) {
                searchContact(info)
            } else if (url == urlCompanies) {
                searchCompany(info)
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