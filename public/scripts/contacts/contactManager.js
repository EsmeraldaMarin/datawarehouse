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

    let formData = new FormData(e.currentTarget)
    let params = {
      method: 'POST',
      type: 'no-cors',
      body: formData
    };
    // formData.set('img_url', imgPreview.src)
    formData.set('img_url', "assets/avatar.png")


    for (var pair of formData.entries()) {

      if (pair[1] == "") {
        console.log("falta rellenar el campo de " + pair[0])
        return
      } else if (pair[1] == "Seleccione una compañía") {
        console.log("falta rellenar el campo de compañía")
        return
      } 
    }
      fetch(urlContacts, params)
        .then(res => res.json())
        .then(data => {

          formData.set('user_id', data.contactId)

          fetch(urlChannels, params)
            .then(res => res.json())
            .then(data => location.reload())
            .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
    

  });
});

