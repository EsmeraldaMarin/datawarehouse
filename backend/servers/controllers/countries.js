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

module.exports= {
    selectCountries,
}
