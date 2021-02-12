let connection = require('../connection');

function selectCountries(req, res) {

    let sql = `SELECT 
    countries.name, countries.id,
    regions.name as 'region'
    FROM countries   
    INNER JOIN regions ON countries.region_id = regions.id
    `;

    connection.query(sql, function (err, countries) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(countries)
        }
    })
}

function selectCountryByRegionId(req, res) {

    let regionId = req.params.id;
    let sql = `SELECT * FROM countries WHERE region_id = ${regionId}`;


    connection.query(sql, function (err, countries) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(countries)
        }
    })


}

function insertCountry(req, res) {
    let newCountry = req.body;

    let sql = `INSERT INTO datawarehouse.countries(name, region_id)
     VALUES ('${newCountry.name}', ${newCountry.region_id});`;

    connection.query(sql, function (err, country) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos del pais' });

        } else {
            res.status(201).json(
                {
                    message: 'country created',
                    countryId: country.insertId
                }
            )
        }
    })
}

module.exports= {
    selectCountries,
    selectCountryByRegionId,
    insertCountry
}
