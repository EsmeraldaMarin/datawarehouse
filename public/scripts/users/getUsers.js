let usersSection = document.getElementById('usersSection');

function getUsers() {
    fetch(urlUsers)
        .then(res => res.json())
        .then(info => {

            createUsers(info)
        })
}
getUsers()

function createUsers(info) {
    createUsersCards(info)

    let actionsBtn = document.querySelectorAll(".acciones");
    let trashBtn = document.querySelectorAll('.acciones .trash')
    actionsBtn.forEach(ac=>{
        ac.addEventListener('mouseover', (e) => {
            ac.classList.add('active');
        })
        ac.addEventListener('mouseout', (e) => {
            ac.classList.remove('active');
        })
    })
    trashBtn.forEach(tr=>{
        tr.addEventListener('click', () => {
            let parent = tr.parentNode.parentNode
            showDeleteModal(parent)
        })
    })

}

function createUsersCards(info) {
    let rol;
    info.forEach(user => {
        if(user.is_admin == 1){
            rol = "administrador"
        } else{
            rol = "básico"
        }
        let newUserHtml = `<article class="user_card" id="user${user.id}">
            <div class="acciones">
                <i class="dots">•••</i>
                <i class="fas fa-trash trash"></i>
                <i class="fas fa-edit edit"></i>
            </div>
            <h2>${user.name} ${user.lastname}</h2>
            <p class="email">Email: <span>${user.email}</span></p>
            <p>Rol: ${rol}</p>            
        </article>
        `

        usersSection.insertAdjacentHTML('beforeend', newUserHtml)
    })
}
function showDeleteModal(parent) {
    let nameUser = parent.querySelector('h2').textContent
    showWindow(deleteUserWindowHTML(nameUser), 'closeDelContactBtn', 'bgdeleteContact')

    let delConfirmBtn = document.getElementById('delConfirmBtn')

    delConfirmBtn.addEventListener('click', () => {
        let container = document.getElementById("bgdeleteContact")
        container.remove()
        body.classList.remove('modalActive')
        deleteContact(parent)
    })


}
function deleteContact(parent) {
    let id = parent.id
    id = id.replace("user", "")

    let url = `${urlUsers}/${id}`
    let parametros = {
        method: 'DELETE',
        type: 'no-cors'
    }

    fetch(url, parametros)
        .then(res => res.json())
        .then(data=> {
            console.log(data);
            location.reload();
        })

}

