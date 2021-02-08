let connection = require('../connection');


function selectRegions(req, res) {

    let sql = `SELECT * FROM regions`;

    connection.query(sql, function (err, regions) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            // res.send(regions)
            let allInforegions = []

            for (let i = 0; i < regions.length; i++) {

                let region = regions[i]
                let sqlCountries = `SELECT  countries.name, countries.id FROM countries
                WHERE region_id = ${region.id}`
                connection.query(sqlCountries, (err, countries) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'Internal error' });

                    } else {

                        for (let it = 0; it < countries.length; it++) {

                            let country = countries[it]
                            let sqlCities = `SELECT cities.id, cities.name FROM cities
                            WHERE country_id = ${country.id}`

                            connection.query(sqlCities, (err, cities) => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({ error: 'Internal error' });

                                } else {
                                    country.allCities = cities

                                    //console.log(country)

                                    if (it == countries.length - 1) {
                                        region.allCountries = countries
                                        allInforegions.push(region)
                                        if (i == regions.length - 1) {
                                            res.send(allInforegions)
                                        }
                                    }

                                }
                            })
                        }





                    }
                })
            }
        }
    })
}

module.exports = {
    selectRegions,
}
