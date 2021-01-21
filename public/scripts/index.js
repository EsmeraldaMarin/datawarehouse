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
