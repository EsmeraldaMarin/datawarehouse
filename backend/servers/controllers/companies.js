let connection = require('../connection');

function selectCompanies(req, res) {

    let sql = `SELECT 
    companies.id,
    companies.name, companies.email, companies.phone, companies.address,
    cities.name AS 'city',
    countries.name AS 'country',
    regions.name AS 'region'
    FROM companies
    INNER JOIN cities ON companies.city_id = cities.id
    INNER JOIN countries ON cities.country_id = countries.id
    INNER JOIN regions ON countries.region_id = regions.id`;

    connection.query(sql, function (err, companies) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            let allInfoCompanies = []

            for (let i = 0; i < companies.length; i++) {

                let company = companies[i]
                let sqlContacts = `SELECT  * FROM contacts
                WHERE company_id = ${company.id}`

                connection.query(sqlContacts, (err, contacts) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'Internal error' });

                    } else {
                        company.allContacts = contacts
                        allInfoCompanies.push(company)
                        if (i == companies.length - 1) {
                            res.send(allInfoCompanies)
                        }

                    }
                })
            }

        }
    })
}
function insertCompany(req, res) {
    let newCompany = req.body;

    let sql = `INSERT INTO datawarehouse.companies(name, phone, email, city_id, address)
    VALUES ("${newCompany.name}", "${newCompany.phone}", "${newCompany.email}", ${newCompany.city_id}, "${newCompany.address}");`;

    connection.query(sql, function (err, company) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos' });

        } else {
            res.status(201).json(
                {
                    message: 'company created',
                    companyId: company.insertId
                }
            )
        }
    })

}
module.exports = {
    selectCompanies,
    insertCompany
}