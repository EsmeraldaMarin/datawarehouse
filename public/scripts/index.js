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
        } else{
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
