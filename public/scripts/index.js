let arrowDown = document.getElementById('displayFilter');

arrowDown.addEventListener('click', (e)=>{
    let searchSection = document.getElementById('searchSection')
    searchSection.classList.toggle('active')
})