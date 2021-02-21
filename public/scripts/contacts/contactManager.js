let ctnManager = document.querySelector('.ctn_manager');

//select all conctacts function

let selectAllContactsBtn = document.getElementById("selectAllContacts");

selectAllContactsBtn.addEventListener("change", () => {
  let contacts = document.querySelectorAll(".selectContact");

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
  selectContactsFunction()
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

//acciones del contacto

function actionsTable(checkbox, seeMoreBtn, trashBtn, channels) {


  //select a contact funcion

  checkbox.forEach(el => {
    el.addEventListener('change', () => {

      let contactRow = el.parentNode.parentNode

      if (el.checked) {
        contactRow.classList.add("selected")
        el.checked = true;
      } else {
        contactRow.classList.remove("selected")
        el.checked = false;
      }
      selectContactsFunction()
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
    el.addEventListener('click', (e) => {
      let parent = el.parentNode.parentNode
      showDeleteModal(parent);

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
function selectContactsFunction() {

  let contactsSelected = document.querySelectorAll('ul.selected');
  let trashSection = document.querySelector('.trashSection')

  if (trashSection) {
    trashSection.remove()
  }
  if (contactsSelected.length > 0) {
    ctnManager.insertAdjacentHTML('beforeend', trashContactSection(contactsSelected.length))
    let trashContactsBtn = document.getElementById('trashContactsBtn');
    trashContactsBtn.addEventListener("click", () => {
      console.log(contactsSelected)
      showDeleteManyContactsModal(contactsSelected)
    })
  }
}



// delete modal 

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

function showDeleteManyContactsModal(arr) {

  showWindow(deleteManyContactsHTML(arr.length), 'closeDelContactBtn', 'bgdeleteContact')

  let delConfirmBtn = document.getElementById('delConfirmBtn')

  delConfirmBtn.addEventListener('click', () => {
    let container = document.getElementById("bgdeleteContact")
    container.remove();

    body.classList.remove('modalActive')

    arr.forEach(el => {
      deleteManyContacts(el.id)
    })
  })
}


// delete contact

function deleteContact(parent) {
  let id = parent.id
  parent.remove()

  id = id.replace("contact", "")

  let url = `http://localhost:3000/contacts/${id}`
  let parametros = {

    method: 'DELETE',
    type: 'no-cors'
  }

  fetch(url, parametros)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      location.reload()
    })

};
function deleteManyContacts(id) {
  id = id.replace("contact", "")

  let url = `http://localhost:3000/contacts/${id}`
  let parametros = {

    method: 'DELETE',
    type: 'no-cors'
  }

  fetch(url, parametros)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      location.reload()
    })

}

