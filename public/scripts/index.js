//varibles globales

let body = document.querySelector('body')


//arrow down

let arrowDown = document.getElementById('displayFilter');

arrowDown.addEventListener('click', (e) => {
    let searchSection = document.getElementById('searchSection')
    searchSection.classList.toggle('active')
})



//select all conctacts function

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

// importar contacto window

let impContactBtn = document.getElementById('impContact');

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

    showWindow(importWindowHTML, 'closeImpContactBtn', 'bgImportContact')

})

//add contact window

let addContactBtn = document.getElementById('addContact')

addContactBtn.addEventListener('click', () => {
    let htmlText = `
    <div class="bg_add_contact" id="bgAddContact">
       <div>
            <div class="header_section">
                <h3><b>NUEVO CONTACTO</b></h3>
                <svg role="img" class="closeBtn" id= "closeAddContactBtn">
                    <use href="assets/button-close.svg#path-1"/>
                </svg>
            </div>
            <div class="info_contact_p">
                <div class="image">
                    <img src="" alt="">
                    <i class="fas fa-camera"></i>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingNombre">
                    <label for="floatingNombre">Nombre *</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingApellido">
                    <label for="floatingApellido">Apellido *</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingCargo">
                    <label for="floatingCargo">Cargo *</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingEmail">
                    <label for="floatingEmail">Email *</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingCompania">
                    <label for="floatingCompania">Compañía *</label>
                </div>
            </div>
            <div class="body_section">
                

                <div class="info_contact_s">
                    <div class="form-selects">
                        <label for="regionSelectAdd">Región</label>
                        <select name="" id="regionSelectAdd">
                            <option value="">bdd</option>
                            <option value="">bdd</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="paisSelectAdd">País</label>
                        <select name="" id="paisSelectAdd" disabled>
                            <option value="">bdd</option>
                            <option value="">bdd</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="ciudadSelectAdd">Ciudad</label>
                        <select name="" id="ciudadSelectAdd" disabled>
                            <option value="">bdd</option>
                            <option value="">bdd</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="addressInputAdd">Dirección</label>
                        <input type="text" id="addressInputAdd" placeholder="Ingrese una dirección" disabled>
                    </div>

                </div>
                <div class="info_contact_t">

                    <div class="form-selects">
                        <label for="canalSelectAdd">Canal de Contacto</label>
                        <select name="" id="canalSelectAdd">
                            <option value="">Whatsapp</option>
                            <option value="">Slack</option>
                            <option value="">Instagram</option>
                            <option value="">Linkedin</option>
                            <option value="">Número Celular</option>
                            <option value="">Email</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="cuentaInputAdd">Cuenta de usuario</label>
                        <input type="text" id="cuentaInputAdd" placeholder="@cuenta123">
                    </div>
                    <div class="form-selects">
                        <label for="preferenciasSelectAdd">Preferencias</label>
                        <select name="" id="preferenciasSelectAdd">
                            <option value="">Sin Preferencias</option>
                            <option value="">No Molestar</option>
                            <option value="">Canal Preferido</option>
                            <option value="">Solo Mensajes</option>
                        </select>

                    </div>

                    <button id= "addChannel"><i class="fas fa-plus"></i></button>
                </div>
                <div class="info_contact_c">

                    <label for="interesInputAdd">Interés</label>
                    <input class="" type="range" value="0" min="0" max="100" step="25" id="interesInputAdd">
                    <select name="" id="">
                        <option value="100">100%</option>
                        <option value="75">75%</option>
                        <option value="50">50%</option>
                        <option value="25">25%</option>
                        <option value="0">0%</option>
                    </select>
                </div>

                <div class="btn_section">
                    <button class="cancel_btn" disabled>Cancelar</button>
                    <button class="save_btn" disabled>Guadar Contacto</button>

                </div>
            </div>
        </div>
    </div>`

    showWindow(htmlText, 'closeAddContactBtn', 'bgAddContact');

    let addChannelBtn = document.getElementById('addChannel')

    addChannelBtn.addEventListener('click', () => {

        let ctn = addChannelBtn.parentNode;
        let newCtn = ctn.cloneNode(true)
        newCtn.classList.add('newClon')
        ctn.parentNode.insertBefore(newCtn, ctn.nextSibling)

        let btnClon = document.querySelector('.newClon button')
        btnClon.remove()
        
        let labels = document.querySelectorAll('.newClon label')
        labels.forEach(lab => lab.remove())

        let selects = document.querySelectorAll('.newClon select')
        selects.forEach(se => se.setAttribute("disabled", ""))

        let inputs = document.querySelectorAll('.newClon input')
        inputs.forEach(inp => inp.setAttribute("disabled", ""))
        


    })

})


//funcion show Window

function showWindow(htmlText, btnId, ctnId) {
    body.insertAdjacentHTML('afterbegin', htmlText);

    let btnClose = document.getElementById(`${btnId}`);
    let container = document.getElementById(`${ctnId}`)

    btnClose.addEventListener('click', () => {
        container.remove()
    })
}