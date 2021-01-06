let connection = require('../connection');

function selectCompanies(req, res) {

    let sql = `SELECT * FROM companies`;

    connection.query(sql, function (err, companies) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(companies)
        }
    })
}

module.exports= {
    selectCompanies,
}