let htmlTextAddContact = `
    <div class="bg_add_contact bg_add" id="bgAddContact">
       <form id="form">
            <div class="header_section">
                <h3><b>NUEVO CONTACTO</b></h3>
                <svg role="img" class="closeBtn" id= "closeAddContactBtn">
                    <use href="assets/button-close.svg#path-1"/>
                </svg>
            </div>
            <div class="info_contact_p">
                <div class="image">
                    <img src="assets/avatar.png" alt="" id= "imgPreview">
                    <input name="img_url" type="file" id="imgUploader">
                    <i class="fas fa-camera"></i>
                </div>

                <div class="form-floating">
                    <input type="text" class="form-control" name="name" id="floatingNombre">
                    <label for="floatingNombre">Nombre *</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" name= "lastname" id="floatingApellido">
                    <label for="floatingApellido">Apellido *</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" name="position" id="floatingCargo">
                    <label for="floatingCargo">Cargo *</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" name="email" id="floatingEmail">
                    <label for="floatingEmail">Email *</label>
                </div>
                <div class="form-floating form-floating-company">
                    <select name="company_id" class="form-control" name="company_id" id="floatingCompania">
                        <option>Seleccione una compañía</option>
                    </select>
                    <label for="floatingCompania">Compañía *</label>
                </div>
            </div>
            <div class="body_section">
                

                <div class="info_contact_s">
                    <div class="form-selects">
                        <label for="regionSelectAdd">Región*</label>
                        <select id="regionSelectAdd">
                            <option>Seleccione una región</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="paisSelectAdd">País*</label>
                        <select id="paisSelectAdd" disabled>
                            <option>Seleccione un país</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="ciudadSelectAdd">Ciudad*</label>
                        <select name="city_id" id="ciudadSelectAdd" disabled>
                            <option>Seleccione una ciudad</option>
                        </select>
                    </div>

                    <div class="form-selects">
                        <label for="addressInputAdd">Dirección*</label>
                        <input type="text" id="addressInputAdd" name="address" placeholder="Ingrese una dirección" disabled>
                    </div>

                </div>
                <div class="info_contact_t header">

                    <div class="form-selects">
                        <h3 for="canalSelectAdd">Canales de Contacto *</h3>
                    </div>

                    <div class="form-selects">
                        <label for="cuentaInputAdd">Cuenta de usuario *</label>
                    </div>
                    <div class="form-selects">
                        <label for="preferenciasSelectAdd">Preferencias *</label>
                    </div>
                </div>
                <div class="info_contact_t whatsapp">
                    <div class="form-selects">
                        <h4><i class="fab fa-whatsapp"></i>Whatsapp</h4>
                    </div>
                    <div class="form-selects">
                        <input type="number" id="whatsappCuentaInputAdd" placeholder="0000-000000">
                    </div>
                    <div class="form-selects">
                        <select name="" id="preferenciaWhatsapp">
                            <option value="sin preferencias">Sin Preferencias</option>
                            <option value="no molestar">No Molestar</option>
                            <option value="canal preferido">Canal Preferido</option>
                        </select>
                    </div>
                    
                    <img src="assets/button-close.svg" class="disableChannel"/>
                </div>
                <div class="info_contact_t telefono">
                    <div class="form-selects">
                        <h4><i class="fas fa-phone"></i>Telefono</h4>
                    </div>
                    <div class="form-selects">
                        <input type="number" id="telefonoCuentaInputAdd" placeholder="0000-000000">
                    </div>
                    <div class="form-selects">
                        <select name="" id="preferenciaTelefono">
                            <option value="sin preferencias">Sin Preferencias</option>
                            <option value="no molestar">No Molestar</option>
                            <option value="canal preferido">Canal Preferido</option>
                        </select>
                    </div>
                    
                    <img src="assets/button-close.svg" class="disableChannel"/>
                </div>
                <div class="info_contact_t facebook">
                    <div class="form-selects">
                        <h4><i class="fab fa-facebook-f"></i>Facebook</h4>
                    </div>
                    <div class="form-selects">
                        <input type="text" id="facebookCuentaInputAdd" placeholder="Tu Cuenta">
                    </div>
                    <div class="form-selects">
                        <select name="" id="preferenciaFacebook">
                            <option value="sin preferencias">Sin Preferencias</option>
                            <option value="no molestar">No Molestar</option>
                            <option value="canal preferido">Canal Preferido</option>
                        </select>
                    </div>
                    
                    <img src="assets/button-close.svg" class="disableChannel"/>
                </div>
                <div class="info_contact_t linkedin">
                    <div class="form-selects">
                        <h4><i class="fab fa-linkedin-in"></i>Linkedin</h4>
                    </div>
                    <div class="form-selects">
                        <input type="text" id="linkedinCuentaInputAdd" placeholder="Tu Cuenta">
                    </div>
                    <div class="form-selects">
                        <select name="" id="preferenciaLinkedin">
                            <option value="sin preferencias">Sin Preferencias</option>
                            <option value="no molestar">No Molestar</option>
                            <option value="canal preferido">Canal Preferido</option>
                        </select>
                    </div>
                    
                    <img src="assets/button-close.svg" class="disableChannel"/>
                </div>
                <div class="info_contact_t slack">
                    <div class="form-selects">
                        <h4><i class="fab fa-slack"></i>Slack</h4>
                    </div>
                    <div class="form-selects">
                        <input type="text" id="slackCuentaInputAdd" placeholder="@TuCuenta123">
                    </div>
                    <div class="form-selects">
                        <select name="" id="preferenciaSlack>
                            <option value="sin preferencias">Sin Preferencias</option>
                            <option value="no molestar">No Molestar</option>
                            <option value="canal preferido">Canal Preferido</option>
                        </select>
                    </div>
                    
                    <img src="assets/button-close.svg" class="disableChannel"/>
                </div>
                <div class="info_contact_c">

                    <label for="interesInputAdd">Interés *</label>
                    <input class="" name="interest" type="range" value="0" min="0" max="100" step="25" id="interesInputAdd">
                </div>

                <div class="btn_section">
                    <button class="cancel_btn" id="cancelBtn">Cancelar</button>
                    <button type= "submit" class="save_btn" id= "saveBtn">Guadar Contacto</button>

                </div>
            </div>
        </form>
    </div>`;


let htmlTextAddCompany = `
<div class="bg_add_company bg_add" id="bgAddCompany">
   <form id="form">
        <div class="header_section">
            <h3><b>NUEVA COMPAÑÍA</b></h3>
            <svg role="img" class="closeBtn" id= "closeAddCompanyBtn">
                <use href="assets/button-close.svg#path-1"/>
            </svg>
        </div>
        <div class="info_contact_p">
            <div class="form-floating">
                <input type="text" class="form-control" name="name" id="floatingNombre">
                <label for="floatingNombre">Nombre *</label>
            </div>           
            <div class="form-floating">
                <input type="email" class="form-control" name="email" id="floatingEmail">
                <label for="floatingEmail">Email *</label>
            </div>
            <div class="form-floating">
                <input type="number" class="form-control" name= "phone" id="floatingPhone">
                <label for="floatingPhone">Teléfono *</label>
            </div>            
        </div>
        <div class="body_section">
            <div class="info_contact_s">
                <div class="form-selects">
                    <label for="regionSelectAdd">Región*</label>
                    <select id="regionSelectAdd">
                        <option>Seleccione una región</option>
                    </select>
                </div>

                <div class="form-selects">
                    <label for="paisSelectAdd">País*</label>
                    <select id="paisSelectAdd" disabled>
                        <option>Seleccione un país</option>
                    </select>
                </div>

                <div class="form-selects">
                    <label for="ciudadSelectAdd">Ciudad*</label>
                    <select name="city_id" id="ciudadSelectAdd" disabled>
                        <option>Seleccione una ciudad</option>
                    </select>
                </div>

                <div class="form-selects">
                    <label for="addressInputAdd">Dirección*</label>
                    <input type="text" id="addressInputAdd" name="address" placeholder="Ingrese una dirección" disabled>
                </div>

            </div>
            <div class="btn_section">
                <button class="cancel_btn" id="cancelBtn">Cancelar</button>
                <button type= "submit" class="save_btn" id= "saveBtn">Guadar Compañía</button>

            </div>
        </div>
    </form>
</div>`

let deleteWindowHTML = `<div class='bg_delete_contact' id= 'bgdeleteContact'>
        <div class='box_delete'>
        <div class='close_btn' id= 'closeDelContactBtn'>
            <img src='assets/button-close.svg'  alt='close Button'>
        </div>
        <img src='assets/delete_contact.png' alt='Delete contact Image'>

        <p>¿Está seguro que desea borrar este contacto?</p>
        <button id="delConfirmBtn">Borrar contacto</button>
    </div>
    </div>`;

let importWindowHTML = `<div class='bg_import_contact' id= 'bgImportContact'>
    <div class='box_import'>
        <div class='close_btn' id= 'closeImpContactBtn'>
            <img src='assets/button-close.svg'  alt='close Button'>
        </div>
        <img src='assets/import_file.png' alt='Import File Image'>

        <p>Selecciona el archivo de tu computador para importar un contacto</p>
        <button>Importar contacto</button>
    </div>
</div>`;