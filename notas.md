Este Commit

* channels carrusel



hacer

poner en minuscula los nombres y apellidos de los usuarios desde agregar usuarios
filas por pagina de contactos
crear svg propios y no de fontawesome
crear contacto con los datos obtenidos
trabajar con el filtro de busqieda
maquetar los otros html


subir imagenes

 var reader = new FileReader();
 reader.readAsDataURL(blob); 
 reader.onloadend = function() {
     var base64data = reader.result;                
     console.log(base64data);
 }

 https://stackoverflow.com/questions/18650168/convert-blob-to-base64

CORREGIR 


//CONTACTOS PARA PRACTICAR

{
    "name": "Alicia",
    "lastname": "Montes",
    "email": "alimon@gmail.com",
    "position": "secretaria",
    "company_id": 1,
    "city_id": 3,
    "address": "Misiones 123",
    "interest": 50,
    "img_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYpKB_FL7yEYizceSr-OSdEJqywoV0yuz7A&usqp=CAU"
},
{
    "name": "Gabriela",
    "lastname": "Martinez",
    "email": "gabi@gmail.com",
    "position": "directora de cultura",
    "company_id": 1,
    "city_id": 3,
    "address": "Catamarca 123",
    "interest": 100,
    "img_url": "https://st.depositphotos.com/2290723/4042/i/600/depositphotos_40421515-stock-photo-woman-in-a-blue-dress.jpg"
},
{
    "name": "Monica",
    "lastname": "Gomez",
    "email": "monigom@gmail.com",
    "position": "UX designer",
    "company_id": 1,
    "city_id": 3,
    "address": "Cordoba 123",
    "interest": 75,
    "img_url": "https://us.123rf.com/450wm/goodluz/goodluz1402/goodluz140200588/25841700-retrato-de-una-hermosa-mujer-rubia-de-40-a%C3%B1os-de-edad-.jpg?ver=6"
},
{
    "name": "Juan",
    "lastname": "Fernandez",
    "email": "juanfe@gmail.com",
    "position": "UI designer",
    "company_id": 1,
    "city_id": 3,
    "address": "Misiones 562",
    "interest": 0,
    "img_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9FzXWUFyc--hxGXl0p5l6ITjocXFWWLsZPg&usqp=CAU"
},
{
    "name": "Sebastian",
    "lastname": "Baez",
    "email": "sebasbaez@gmail.com",
    "position": "secretario",
    "company_id": 1,
    "city_id": 3,
    "address": "Sarmiento 123",
    "interest": 25,
    "img_url": "https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg"
}



<h3>Contactos</h3>
                    <ul>
                        <li>
                            <img src="https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg" alt="">
                            <div class="info_contact_company">
                                <p class="name_user">Tomas Aguirre</p>
                                <p class="email_user">tomiaguirre@gmail.com</p>

                            </div>
                        </li>
                        <li>
                            <img src="https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg" alt="">
                            <div class="info_contact_company">
                                <p class="name_user">Tomas Aguirre</p>
                                <p class="email_user">tomiaguirre@gmail.com</p>

                            </div>
                        </li>
                        <li>
                            <img src="https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg" alt="">
                            <div class="info_contact_company">
                                <p class="name_user">Tomas Aguirre</p>
                                <p class="email_user">tomiaguirre@gmail.com</p>

                            </div>
                        </li>
                        <li>
                            <img src="https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg" alt="">
                            <div class="info_contact_company">
                                <p class="name_user">Tomas Aguirre</p>
                                <p class="email_user">tomiaguirre@gmail.com</p>

                            </div>
                        </li>
                        <li>
                            <img src="https://i.pinimg.com/236x/18/b2/38/18b23822d6117f28d22d2154dd6389df.jpg" alt="">
                            <div class="info_contact_company">
                                <p class="name_user">Tomas Aguirre</p>
                                <p class="email_user">tomiaguirre@gmail.com</p>

                            </div>
                        </li>
                    </ul>

styles


ul {
            position: absolute;
            background-color: #fff;
            height: 0px;
            width: 82%;
            margin: 0 auto;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            padding: 5px;
            overflow-y: scroll;
            overflow-x: hidden;
            li {
                display: flex;
                align-items: center;
                padding: 5px;
                font-size: 12px;
                cursor: pointer;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 25px;
                    object-fit: cover;
                }
                .info_contact_company {
                    margin-left: 10px;
                    .email_user {
                        color: #333;
                    }
                    .name_user {
                        text-transform: capitalize;
                    }
                }

                &:hover {
                    background-color: #eee;
                }
            }

            &::-webkit-scrollbar {
                -webkit-appearance: none;
            }

            &::-webkit-scrollbar:vertical {
                width: 5px;
            }

            &::-webkit-scrollbar-button:increment,
            &::-webkit-scrollbar-button {
                display: none;
            }

            &::-webkit-scrollbar-thumb {
                background-color: #797979;
                border-radius: 20px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 10px;
            }
        }