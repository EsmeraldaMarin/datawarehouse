let connection = require('../connection');


function selectRegions(req, res) {

    let sql = `SELECT * FROM regions`;

    connection.query(sql, function (err, regions) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
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

function selectInfoRegion(req, res) {

    let regionId = req.params.id;
    let sql = `SELECT * FROM regions WHERE regions.id = ${regionId}`;


    connection.query(sql, function (err, region) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {

            let sqlContactsByRegion = `SELECT contacts.id, contacts.name,contacts.lastname, contacts.email, contacts.position, contacts.interest, contacts.img_url,
                companies.name AS 'company'
                FROM contacts
                INNER JOIN companies ON contacts.company_id = companies.id
                INNER JOIN cities ON contacts.city_id = cities.id
                INNER JOIN countries ON cities.country_id = countries.id
                INNER JOIN regions ON countries.region_id = regions.id
                WHERE regions.id = ${regionId}`

            connection.query(sqlContactsByRegion, (err, contacts) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Internal error' });

                } else {
                    region[0].allContacts = contacts
                    // res.send(region)
                }
            })
            let sqlCompaniesByRegion = `SELECT companies.id, companies.name,companies.email, companies.phone, companies.address,
                cities.name AS 'city'
                FROM companies
                INNER JOIN cities ON companies.city_id = cities.id
                INNER JOIN countries ON cities.country_id = countries.id
                INNER JOIN regions ON countries.region_id = regions.id
                WHERE regions.id = ${regionId}`

            connection.query(sqlCompaniesByRegion, (err, companies) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Internal error' });

                } else {
                    region[0].allCompanies = companies
                    res.send(region)
                }
            })
        }
    })


}

module.exports = {
    selectRegions,
    selectInfoRegion
}
