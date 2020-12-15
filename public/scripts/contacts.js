let contactsSection = document.getElementById('contactsSection')

function showContacts() {
    const url = 'http://localhost:3000/contacts'

    fetch(url)
        .then(res => res.json())
        .then(info => {

            info.forEach(contact => {

                let classInteres;
                let channels = contact.channelsName.split(",");
                

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
                        <li class="canal" id="canal"></li>
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
                let channelLi = document.querySelector(`#contact${contact.id} li#canal`);
                channels.forEach(ch => {
                    let p = document.createElement('p')
                    p.textContent = ch;
                    p.className = "channel"
                    channelLi.appendChild(p)
                })
                    
                


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

function deleteContact(parent) {
    let id = parent.id
    parent.remove()

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
            console.log("boton trash")
            showDeleteModal(parent)

        })
    })
}

function showDeleteModal(parent) {

    let importWindowHTML =
        `<div class='bg_delete_contact' id= 'bgdeleteContact'>
            <div class='box_delete'>
            <div class='close_btn' id= 'closeDelContactBtn'>
                <img src='assets/button-close.svg'  alt='close Button'>
            </div>
            <img src='assets/delete_contact.png' alt='Delete contact Image'>

            <p>¿Está seguro que desea borrar este contacto?</p>
            <button id="delConfirmBtn">Borrar contacto</button>
        </div>
        </div>`

    showWindow(importWindowHTML, 'closeDelContactBtn', 'bgdeleteContact')

    let delConfirmBtn = document.getElementById('delConfirmBtn')
    console.log("boton confirm")

    delConfirmBtn.addEventListener('click', ()=>{
        let container = document.getElementById("bgdeleteContact")
        container.remove()
        deleteContact(parent)
    })


}