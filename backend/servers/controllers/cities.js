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

module.exports= {
    selectCities,
}