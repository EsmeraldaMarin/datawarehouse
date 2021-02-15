let connection = require('../connection');

function selectCities(req, res) {

    let sql = `SELECT 
    cities.name, cities.id,
    countries.name as 'country'
    FROM cities   
    INNER JOIN countries ON cities.country_id = countries.id
    `;

    connection.query(sql, function (err, cities) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(cities)
        }
    })
}

function selectCityByCountryId(req, res) {

    let countryId = req.params.id;
    let sql = `SELECT * FROM cities WHERE country_id = ${countryId}`;


    connection.query(sql, function (err, cities) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(cities)
        }
    })


}

function insertCity(req, res) {
    let newCity = req.body;

    let sql = `INSERT INTO datawarehouse.cities(name, country_id)
     VALUES ('${newCity.name}', ${newCity.country_id});`;

    connection.query(sql, function (err, city) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos de la ciudad' });

        } else {
            res.status(201).json(
                {
                    message: 'city created',
                    cityId: city.insertId
                }
            )
        }
    })
}
function deleteCity(req, res) {

    let cityId = req.params.id;
    let sql = `DELETE FROM cities WHERE id = ${cityId}`

    connection.query(sql, function (err, city) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Error' });

        } else {

            res.status(200).json({ message: 'city deleted', city })

        }
    })

}

module.exports = {
    selectCities,
    selectCityByCountryId,
    insertCity,
    deleteCity
}