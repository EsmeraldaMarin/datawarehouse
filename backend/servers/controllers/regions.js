let connection = require('../connection');


function selectRegions(req, res) {

    let sql = `SELECT * FROM regions`;

    connection.query(sql, function (err, regions) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            res.send(regions)
        }
    })
}

module.exports= {
    selectRegions,
}
