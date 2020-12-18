let inputSearchContacts = document.getElementById('input_contactos');
let btnSearchContacts = document.getElementById('search_contactos');


btnSearchContacts.addEventListener("click", searchContact);
inputSearchContacts.addEventListener("keyup", (event) => {

    if (event.key == "Enter") {

        event.preventDefault();
        searchContact();

    }
})

function searchContact() {
    const url = 'http://localhost:3000/contacts'
    let busqueda = inputSearchContacts.value;
    busqueda = busqueda.replace(/ /g, "");
    busqueda = busqueda.toLowerCase();
    if (busqueda == "") {
        console.log("Ingrese un dato en el buscador")
        return
    }
    let response = []

    fetch(url)
        .then(res => res.json())
        .then(info => {

            let wordLength = busqueda.length

            function searchTerms(contact, propiedad) {
                if (propiedad.substring(0, wordLength) == busqueda) { response.push(contact) }
            }

            info.forEach(contact => { searchTerms(contact, contact.name + contact.lastname) });
            info.forEach(contact => { searchTerms(contact, contact.name) });
            info.forEach(contact => { searchTerms(contact, contact.lastname) });
            info.forEach(contact => { searchTerms(contact, contact.email) });
            info.forEach(contact => { searchTerms(contact, contact.company) });
            info.forEach(contact => { searchTerms(contact, contact.position) });
            info.forEach(contact => { searchTerms(contact, contact.country) });
            info.forEach(contact => { searchTerms(contact, contact.region) });
            info.forEach(contact => { searchTerms(contact, contact.address) });


            response = response.filter((item, index) => {
                return response.indexOf(item) === index;
            })

            return response

        }).then((res) => {
            contactsSection.innerHTML = ``
            createUlContacts(res)
        }).then(() => {
            let selectContactBtn = document.querySelectorAll('#selectContact');
            let seeMoreActionsBtn = document.querySelectorAll('#actions #dots');
            let trashBtn = document.querySelectorAll('#actions #trashBtn');
            let channelsBtn = document.querySelectorAll('#canal .channel');

            actionsTable(selectContactBtn, seeMoreActionsBtn, trashBtn, channelsBtn)
        })
}

