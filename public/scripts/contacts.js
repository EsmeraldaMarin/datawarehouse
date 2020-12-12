let contactsSection = document.getElementById('contactsSection')

function showContacts() {
    const url = 'http://localhost:3000/contacts'

    fetch(url)
        .then(res => res.json())
        .then(info => {

            info.forEach(contact => {

                let classInteres;

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

                let contactUl = `
                    <ul class="contact" id= "contact${contact.id}">
                        <li class="checkbox">
                            <input type="checkbox" name="" id="selectContact">
                        </li>
                        <li class="contact_info">
                            <img src= ${contact.img_url} alt="perfil photo">
                            <div class="name_contact">
                                <p class="name">${contact.name} ${contact.lastname}</p>
                                <p class="email">${contact.email}</p>
                            </div>
                        </li>
                        <li class="pais_region">
                            <p class="pais">${contact.country}</p>
                            <p class="region">${contact.region}</p>
                        </li>
                        <li class="empresa">${contact.company}</li>
                        <li class="cargo">${contact.position}</li>
                        <li class="canal">
                            <p class="channel">Whatsapp</p>
                            <p class="channel">Slack</p>
                        </li>
                        <li class="interes ${classInteres}">
                            <div class="bg_line"></div>
                            <div class="color_line"></div>
                        </li>
                        <li class="acciones" id="actions">
                            <i class="dots" id="dots">•••</i>
                            <i class="fas fa-trash trash" id="trashBtn"></i>
                            <i class="fas fa-edit edit"></i>
                        </li>
                    </ul>`
                contactsSection.insertAdjacentHTML('beforeend', contactUl)

            });

        })
        .then(() => {
            let selectContactBtn = document.querySelectorAll('#selectContact');
            let seeMoreActionsBtn = document.querySelectorAll('#actions #dots');
            let trashBtn = document.querySelectorAll('#actions #trashBtn');
            actionsTable(selectContactBtn, seeMoreActionsBtn, trashBtn)
        })

}
showContacts()

function deleteContact(id) {

    id = id.replace("contact", "")
    let url = `http://localhost:3000/contacts/${id}`
    let parametros = {

        method: 'DELETE',
        //body: form,
        type: 'no-cors'
    }

    fetch(url, parametros)
        .then(res => res.json())
        .then(console.log("contacto borrado")) 

}

function actionsTable(checkbox, seeMoreBtn, trashBtn) {

    //select a contact funcion

    checkbox.forEach(el => {
        el.addEventListener('change', () => {

            let contactRow = el.parentNode.parentNode
            if (el.checked) {
                contactRow.classList.add("selected")
                el.checked = true
            } else {
                contactRow.classList.remove("selected")
                el.checked = false
            }
        })
    })

    //see more actions


    seeMoreBtn.forEach(el => {
        el.addEventListener('click', () => {
            let parent = el.parentNode
            parent.classList.toggle('active')
        })
    })


    //trash contact

    trashBtn.forEach(el => {
        el.addEventListener('click', () => {
            let parent = el.parentNode.parentNode
            deleteContact(parent.id)
            parent.remove()
        })
    })
}