let contactsSection = document.getElementById('contactsSection');
let totalContactsSpan = document.getElementById('totalContacts');
let optionsRowsSelect = document.getElementById('optionsRows');
let firstContactRowSpan = document.getElementById('firstContactRow');
let lastContactRowSpan = document.getElementById('lastContactRow');
let optionsRowsSelected = optionsRowsSelect.value;
let limit = parseFloat(optionsRowsSelected);
let offset = 0;
let prevPage = document.getElementById('prevPage');
let nextPage = document.getElementById('nextPage');
let lastLimit;


function showContacts(offset) {
    const url = 'http://localhost:3000/contacts'

    fetch(url)
        .then(res => res.json())
        .then(info => {
            let contacts = info.slice(offset, info.length);
            createContacts(info, limit, contacts)
        })
}
showContacts(offset)


function createContacts(allCon, limit, info) {

    createUl(info, limit);
    let selectContactBtn = document.querySelectorAll('#selectContact');
    let seeMoreActionsBtn = document.querySelectorAll('.acciones');
    let trashBtn = document.querySelectorAll('#actions #trashBtn');
    let channelsBtn = document.querySelectorAll('#canal .channel');

    actionsTable(selectContactBtn, seeMoreActionsBtn, trashBtn, channelsBtn)

    totalContactsSpan.textContent = allCon.length;
    firstContactRowSpan.textContent = offset + 1;
    lastContactRowSpan.textContent = offset + limit;

    if (offset + limit > allCon.length) {
        lastContactRowSpan.textContent = allCon.length;
        nextPage.setAttribute("disabled", "");
    } else {
        nextPage.removeAttribute("disabled");
    }
    if (offset <= 0) {
        prevPage.setAttribute("disabled", "");
    } else {
        prevPage.removeAttribute("disabled");
    }

}

function createUl(info, limit) {

    contactsSection.innerHTML = ``

    let i = 0

    info.forEach(contact => {

        if (i == limit) {
            return
        }

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

        contact.img_url = "assets/avatar.png"

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
                <li class="canal" id="canal">
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
        contactsSection.insertAdjacentHTML('beforeend', contactUl);
        let channelLi = document.querySelector(`#contact${contact.id} li#canal`);
        let btn1 = document.createElement('button');
        btn1.textContent = `›`;

        channels.forEach(ch => {

            let p = document.createElement('div')
            p.textContent = ch;
            p.className = "channel"
            if (ch == channels[0]) {
                p.classList.add('channelOnScreen')
            }
            channelLi.appendChild(p)
        });

        //scroll de los canales a la pantalla
        if (channels.length > 1) {
            channelLi.appendChild(btn1);
            let ins = 0;
            btn1.addEventListener('click', (e) => {
                ins++
                if (ins == channels.length) {
                    ins = 0
                }
                let channelChildren = []
                let allChildren = e.target.parentNode.children
                for (let i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].classList.contains('channel')) {
                        channelChildren.push(allChildren[i])
                    }
                    if (allChildren[i].classList.contains('channelOnScreen')) {
                        allChildren[i].classList.remove('channelOnScreen')
                    }
                }
                channelChildren[ins].classList.add('channelOnScreen')

            })
        }
        i++
    });

}


function showContactById(id) {
    const url = `http://localhost:3000/channels/${id}`

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                resolve(json)
            })
    });
}

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

function actionsTable(checkbox, seeMoreBtn, trashBtn, channels) {

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
        el.addEventListener('mouseover', () => {
            el.classList.add('active')
        })
        el.addEventListener('mouseout', () => {
            el.classList.remove('active')
        })
    })


    //trash contact

    trashBtn.forEach(el => {
        el.addEventListener('click', () => {
            let parent = el.parentNode.parentNode
            showDeleteModal(parent)

        })
    })

    //channel details

    channels.forEach(el => {
        let parent = el.parentNode.parentNode
        let id = parent.id
        id = id.replace("contact", "")

        let contact = showContactById(id).then(el => { return el })
        contact.then(res => {
            let channel = res.find(ch => ch.channel_name == el.textContent)

            showChannelDetail(channel, el)
        })

    })
}

function showChannelDetail(channel, p) {
    let preferenceIcon;
    switch (channel.preferences) {
        case "no molestar":
            preferenceIcon = '<i class="far fa-bell-slash"></i>';
            break;
        case "sin preferencia":
            preferenceIcon = '<i class="far fa-thumbs-up"></i>';
            break;

        case "canal preferido":
            preferenceIcon = '<i class="far fa-star"></i>';
            break;
    }

    let channelDetailHtml = `
    <div class="details-ctn">
        <p class="title-channel">${channel.channel_name}</p>
        <p><i class="far fa-user"></i> ${channel.channel_username}</p>
        <P class="preferencia">${preferenceIcon} ${channel.preferences}</P>
    </div>
    `
    p.insertAdjacentHTML('afterbegin', channelDetailHtml)
}

function showDeleteModal(parent) {

    showWindow(deleteWindowHTML, 'closeDelContactBtn', 'bgdeleteContact')

    let delConfirmBtn = document.getElementById('delConfirmBtn')

    delConfirmBtn.addEventListener('click', () => {
        let container = document.getElementById("bgdeleteContact")
        container.remove()
        body.classList.remove('modalActive')
        deleteContact(parent)
    })


}

optionsRowsSelect.addEventListener('change', (e) => {
    limit = parseFloat(optionsRowsSelect.value)
    showContacts(offset, limit)
})
nextPage.addEventListener('click', () => {
    offset = offset + limit;
    lastLimit = limit
    showContacts(offset)
})
prevPage.addEventListener('click', () => {
    console.log(lastLimit)
    offset = offset - lastLimit
    showContacts(offset)
})