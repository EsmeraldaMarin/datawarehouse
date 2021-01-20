//varibles globales

let body = document.querySelector("body");
let urlRegions = "http://localhost:3000/regions";
let urlCountries = "http://localhost:3000/countries";
let urlCities = "http://localhost:3000/cities";
let urlCompanies = "http://localhost:3000/companies";

//arrow down

let arrowDown = document.getElementById("displayFilter");

arrowDown.addEventListener("click", (e) => {
  let searchSection = document.getElementById("searchSection");
  searchSection.classList.toggle("active");
});

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

  getOptionsOfDB(urlCompanies, floatingInputCompany, false);
  uploadImg(imgPreview, imgUploader);
  locationSelects(regionSelect, countrySelect, citySelect, addressInput);
  disableChannel();

  floatingInput.forEach((input) => {
    input.addEventListener("keyup", () => {
      if (input.value) {
        input.classList.add("inputActive");
      } else {
        input.classList.remove("inputActive");
      }
    });
  });

  floatingInputCompany.addEventListener("change", () => {
    if (floatingInputCompany.value) {
      floatingInputCompany.classList.add("inputActive");
    } else {
      floatingInputCompany.classList.remove("inputActive");
    }
  });

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
    ctn.remove();
  });

  saveBtn.addEventListener("click", () => {
    let newContact, name, lastname, position, email, company, city, address, img, interest;
    let channels = {
      email: [],
      whatsapp: [],
      telefono: [],
      facebook: [],
      linkedin: [],
      slack: [],
    };

    try {

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

      if(channelInputs[0].hasAttribute("disabled")&&
      channelInputs[1].hasAttribute("disabled")&&
      channelInputs[2].hasAttribute("disabled")&&
      channelInputs[3].hasAttribute("disabled")&&
      channelInputs[4].hasAttribute("disabled")&&
      channelInputs[5].hasAttribute("disabled")
      ){
        console.log("No hay ningun canal")
        throw "ningun canal"
      }

      if (selectValues.citySelected == "Seleccione una ciudad") {
        throw "select ciudad";

      } else if (selectValues.addressSelected == "") {
        throw "input direccion";

      } else {
        city = selectValues.citySelected;
        address = selectValues.addressSelected;

      }
      company = floatingInputCompany.value;
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
        channels: channels,
        interest: interest,
        img: img
      };


    } catch (err) {
      console.error(`Falta rellenar el campo de ${err}`)
    }
  });
});

//funcion selects dependientes

let countrieEventCreated = false;

function locationSelects(
  regionSelect,
  countrySelect,
  citySelect,
  addressInput
) {
  let region = getOptionsOfDB(urlRegions, regionSelect, false);
  region.then((regionsInfo) => {
    regionSelect.addEventListener("change", (e) => {
      if (countrySelect.childNodes) {
        countrySelect.innerHTML = `<option>Seleccione un pais</option>`;
      }
      if (citySelect.childNodes) {
        citySelect.setAttribute("disabled", "");
        addressInput.setAttribute("disabled", "");
        citySelect.innerHTML = `<option>Seleccione una ciudad</option>`;
      }

      let regionSelected = regionsInfo.find(
        (reg) => reg.name == regionSelect.value
      );
      let country = getOptionsOfDB(urlCountries, countrySelect, regionSelected);
      countrySelect.removeAttribute("disabled");

      country.then((countriesInfo) => {
        if (!countrieEventCreated) {
          countrySelect.addEventListener("change", (e) => {
            countrieEventCreated = true;

            if (citySelect.childNodes) {
              addressInput.setAttribute("disabled", "");
              citySelect.innerHTML = `<option>Seleccione una ciudad</option>`;
            }

            let countrySelected = countriesInfo.find(
              (co) => co.name == countrySelect.value
            );
            let city = getOptionsOfDB(urlCities, citySelect, countrySelected);
            citySelect.addEventListener("change", () => {
              addressInput.removeAttribute("disabled");
            });
            citySelect.removeAttribute("disabled");
          });
        }
      });
    });
  });
}

//funcion opciones ubicacion add contacto

function getOptionsOfDB(url, ctn, parentLocation) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((info) => {
        info.forEach((el) => {
          if (parentLocation) {
            if (
              parentLocation.name == el.region ||
              parentLocation.name == el.country
            ) {
              let option = document.createElement("option");
              option.textContent = el.name;
              option.value = el.name;
              ctn.appendChild(option);
            }
          } else {
            let option = document.createElement("option");
            option.textContent = el.name;
            option.value = el.name;
            ctn.appendChild(option);
          }
        });
        resolve(info);
      });
  });
}

//function subir imagen

function uploadImg(imgP, imgU) {
  imgU.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let imgCodified;
    // let reader = new FileReader();

    if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif") {

      /* reader.onload = (e) => {
        imgP.src = e.target.result;
        console.log(e.target.result)
      };
      reader.readAsDataURL(file); */

      imgCodified = URL.createObjectURL(file)
      imgP.src = imgCodified

    } else {

      console.log("Archivo invalido")
      imgP.classList.add("archivoInvalido")
    }

  });
}
//funcion show Window

function showWindow(htmlText, btnId, ctnId) {
  body.insertAdjacentHTML("afterbegin", htmlText);

  let btnClose = document.getElementById(`${btnId}`);
  let container = document.getElementById(`${ctnId}`);

  btnClose.addEventListener("click", () => {
    container.remove();
  });
}

function disableChannel() {
  let btns = document.querySelectorAll(".disableChannel");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let parent = e.target.parentNode;

      parent.classList.toggle("channelDisabled");
      let searchClass = parent.classList.contains("channelDisabled");

      if (searchClass) {
        btn.insertAdjacentHTML(
          "afterend",
          `<img src="assets/return.png" class="returnIcon"/>`
        );
        parent.childNodes[3].childNodes[1].setAttribute("disabled", "");
        parent.childNodes[5].childNodes[1].setAttribute("disabled", "");
      } else {
        btn.nextSibling.remove();
        parent.childNodes[3].childNodes[1].removeAttribute("disabled");
        parent.childNodes[5].childNodes[1].removeAttribute("disabled");
      }
    });
  });
}
