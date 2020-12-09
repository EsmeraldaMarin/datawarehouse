

let arrowDown = document.getElementById('displayFilter');

arrowDown.addEventListener('click', (e) => {
    let searchSection = document.getElementById('searchSection')
    searchSection.classList.toggle('active')
})



let selectContactBtn = document.querySelectorAll('#selectContact')

selectContactBtn.forEach(el => {
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

let selectAllContactsBtn = document.getElementById('selectAllContacts')

selectAllContactsBtn.addEventListener('change', () => {
    let contacts = document.querySelectorAll('#selectContact')

    if (selectAllContactsBtn.checked) {
        contacts.forEach(el => {
            el.parentNode.parentNode.classList.add("selected");
            el.checked = true
        })

    } else {
        contacts.forEach(el => {
            el.parentNode.parentNode.classList.remove("selected");
            el.checked = false
        })
    }

})

let seeMoreActionsBtn = document.querySelectorAll('#actions #dots');
seeMoreActionsBtn.forEach(el => {
    el.addEventListener('click', () => {
        let parent = el.parentNode
        parent.classList.toggle('active')
    })
})

let impContactBtn = document.getElementById('impContact');
let body = document.querySelector('body')

impContactBtn.addEventListener('click', () => {
    let importWindowHTML =
        `<div class='bg_import_contact' id= 'bgImportContact'>
        <div class='box_import'>
            <div class='close_btn' id= 'closeImpContactBtn'>
                <img src='assets/button-close.svg'  alt='close Button'>
            </div>
            <img src='assets/import_file.png' alt='Import File Image'>

            <p>Selecciona el archivo de tu computador para importar un contacto</p>
            <button>Importar contacto</button>
        </div>
    </div>`
    body.insertAdjacentHTML('afterbegin', importWindowHTML);

    let closeImpContactBtn = document.getElementById('closeImpContactBtn')
    closeImpContactBtn.addEventListener('click', () => {
        let impContactCtn = document.getElementById('bgImportContact')
        impContactCtn.remove()
    })

})


/* <div class="bg_import_contact">
        <div class="box_import">
            <div class="close_btn">
                <img src="assets/button-close.svg"  alt="close Button">
            </div>
            <img src="assets/import_file.png" alt="Import File Image">

            <p>Selecciona el archivo de tu computador para importar un contacto</p>
            <button>Importar contacto</button>
        </div>
    </div> */