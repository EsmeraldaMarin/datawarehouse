//select all conctacts function

let selectAllContactsBtn = document.getElementById("selectAllContacts");

selectAllContactsBtn.addEventListener("change", () => {
  let contacts = document.querySelectorAll("#selectContact");

  if (selectAllContactsBtn.checked) {
    contacts.forEach((el) => {
      el.parentNode.parentNode.classList.add("selected");
      el.checked = true;
      el.addEventListener("change", () => {
        if (!el.checked) {
          selectAllContactsBtn.checked = false;
        }
      });
    });
  } else {
    contacts.forEach((el) => {
      el.parentNode.parentNode.classList.remove("selected");
      el.checked = false;
    });
  }
});

// importar contacto window

let impContactBtn = document.getElementById("impContact");

impContactBtn.addEventListener("click", () => {
  showWindow(importWindowHTML, "closeImpContactBtn", "bgImportContact");
});

//add contact window

let addContactBtn = document.getElementById("addContact");

addContactBtn.addEventListener("click", () => {
  showWindow(htmlTextAddContact, "closeAddContactBtn", "bgAddContact");

  let floatingInput = document.querySelectorAll(".form-control");
  let floatingInputCompany = document.querySelector("#floatingCompania");
  let channelInputs = document.querySelectorAll(
    ".info_contact_t .form-selects input"
  );
  let channelSelects = document.querySelectorAll(
    ".info_contact_t .form-selects select"
  );
  let regionSelect = document.getElementById("regionSelectAdd");
  let countrySelect = document.getElementById("paisSelectAdd");
  let citySelect = document.getElementById("ciudadSelectAdd");
  let addressInput = document.getElementById("addressInputAdd");
  let imgPreview = document.getElementById("imgPreview");
  let imgUploader = document.getElementById("imgUploader");
  let cancelBtn = document.getElementById("cancelBtn");
  let saveBtn = document.getElementById("saveBtn");
  let inputRangeInteres = document.getElementById("interesInputAdd");
  let form = document.getElementById('form');
  let file = [];

  getOptionsOfDB(urlCompanies, floatingInputCompany, false);
  uploadImg(imgPreview, imgUploader, file);
  locationSelects(regionSelect, countrySelect, citySelect, addressInput);
  disableChannel();

  floatingInput.forEach((input) => {
    inputLabels(input)
  });
  inputLabels(floatingInputCompany)

  inputRangeInteres.addEventListener("change", () => {
    if (inputRangeInteres.nextSibling) {
      inputRangeInteres.nextSibling.remove();
    }

    inputRangeInteres.insertAdjacentHTML(
      "afterend",
      `${inputRangeInteres.value}%`
    );
  });


  cancelBtn.addEventListener("click", () => {
    let ctn = document.getElementById("bgAddContact");
    body.classList.remove('modalActive')
    ctn.remove();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newContact, name, lastname, position, email, company, city, address, img, interest;
    let channels = {
      email: [],
      whatsapp: [],
      telefono: [],
      facebook: [],
      linkedin: [],
      slack: [],
    };


    let formData = new FormData(e.currentTarget)
    let params = {
      method: 'POST',
      type: 'no-cors',
      body: formData
    };
    formData.set('img_url', imgPreview.src)
    /* fetch(urlContacts, params)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err)) */

    /* try {


      fetch(urlContacts, params)
        .then(res => res.json())
        .then(info => {
          console.log(info)
        })

      floatingInput.forEach((info) => {
        if (info.value == "") {
          switch (info.id) {
            case "floatingNombre":
              throw "input nombre"
            case "floatingApellido":
              throw "input apellido"
            case "floatingEmail":
              throw "input email"
            case "floatingCargo":
              throw "input cargo"
          }
        } else {
          switch (info.id) {
            case "floatingNombre":
              name = info.value;
              break;
            case "floatingApellido":
              lastname = info.value;
              break;
            case "floatingEmail":
              email = info.value;
              break;
            case "floatingCargo":
              position = info.value;
              break;
          }
        }
      });

      channelInputs.forEach((user) => {

        if (user.value == "" && user.hasAttribute("disabled")) {
          switch (user.id) {
            case "emailCuentaInputAdd":
              delete channels.email
              break;
            case "whatsappCuentaInputAdd":
              delete channels.whatsapp
              break;
            case "telefonoCuentaInputAdd":
              delete channels.telefono
              break;
            case "facebookCuentaInputAdd":
              delete channels.facebook
              break;
            case "linkedinCuentaInputAdd":
              delete channels.linkedin
              break;
            case "slackCuentaInputAdd":
              delete channels.slack
              break;
          }
          return;

        } else if (user.value == "") {
          switch (user.id) {
            case "emailCuentaInputAdd":
              throw "input email"
            case "whatsappCuentaInputAdd":
              throw "input whatsapp"
            case "telefonoCuentaInputAdd":
              throw "input telefono"
            case "facebookCuentaInputAdd":
              throw "input facebook"
            case "linkedinCuentaInputAdd":
              throw "input linkedin"
            case "slackCuentaInputAdd":
              throw "input slack"
          }
          //FALTA SACAR UN CANAL SI EL VALUE ESTA VACIO
        } else {

          switch (user.id) {
            case "emailCuentaInputAdd":
              channels.email.push(user.value);
              break;
            case "whatsappCuentaInputAdd":
              channels.whatsapp.push(user.value);
              break;
            case "telefonoCuentaInputAdd":
              channels.telefono.push(user.value);
              break;
            case "facebookCuentaInputAdd":
              channels.facebook.push(user.value);
              break;
            case "linkedinCuentaInputAdd":
              channels.linkedin.push(user.value);
              break;
            case "slackCuentaInputAdd":
              channels.slack.push(user.value);
              break;
          }
        }
      });
      channelSelects.forEach(select => {
        if (select.hasAttribute("disabled")) {
          return
        } else {
          switch (select.id) {
            case "preferenciaEmail":
              channels.email.push(select.value);
              break;
            case "preferenciaWhatsapp":
              channels.whatsapp.push(select.value);
              break;
            case "preferenciaTelefono":
              channels.telefono.push(select.value);
              break;
            case "preferenciaFacebook":
              channels.facebook.push(select.value);
              break;
            case "preferenciaLinkedin":
              channels.linkedin.push(select.value);
              break;
            case "preferenciaSlack":
              channels.slack.push(select.value);
              break;
          }
        }

      })

      let selectValues = {
        regionSelected: regionSelect.value,
        countrySelected: countrySelect.value,
        citySelected: citySelect.value,
        addressSelected: addressInput.value,
      };

      if (channelInputs[0].hasAttribute("disabled") &&
        channelInputs[1].hasAttribute("disabled") &&
        channelInputs[2].hasAttribute("disabled") &&
        channelInputs[3].hasAttribute("disabled") &&
        channelInputs[4].hasAttribute("disabled") &&
        channelInputs[5].hasAttribute("disabled")
      ) {
        console.log("No hay ningun canal")
        throw "ningun canal"
      }

      if (selectValues.citySelected == "Seleccione una ciudad") {
        throw "select ciudad";

      } else if (selectValues.addressSelected == "") {
        throw "input direccion";

      } else {
        city = parseInt(selectValues.citySelected, 10);
        address = selectValues.addressSelected;

      }
      company = parseInt(floatingInputCompany.value, 10);
      interest = parseInt(inputRangeInteres.value, 10);
      if (imgPreview.src == "http://127.0.0.1:5500/public/assets/avatar.png") {
        img = "assets/avatar.png"
      } else {
        img = imgPreview.src
      }



      newContact = {
        name: name,
        lastname: lastname,
        email: email,
        position: position,
        company: company,
        city: city,
        address: address,
        // channels: channels,
        interest: interest,
        img: img
      };
      console.log(newContact)

      
        {
            "name": "Catalina",
            "lastname": "Rosales",
            "email": "catarosales@gmail.com",
            "position": "organizadora de eventos",
            "company_id": 2,
            "city_id": 2,
            "address": "La Rioja 123",
            "interest": 100,
            "img_url": "https://storage.googleapis.com/static-vibuk/profiles/26300.jpg"
        }
    



    } catch (err) {
      console.error(`Falta rellenar el campo de ${err}`)
    } */
  });
});
