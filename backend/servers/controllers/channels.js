let connection = require('../connection');

function getChannelsById(req, res) {

    let contactId = req.params.id;
    let sql = `SELECT * FROM channels WHERE user_id = ${contactId}`
    connection.query(sql, function (err, channel) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos para actualizar' });

        } else {
            res.send(channel)
        }
    })

}

function insertChannels(req, res) {
    let newChannel = req.body;

    let sqlGral = `INSERT INTO datawarehouse.channels(channel_name, channel_username, user_id, preferences) VALUES`

    if (newChannel.whatsapp) {
        let sql = sqlGral + ` ("whatsapp", "${newChannel.whatsapp}", ${newChannel.user_id}, "${newChannel.wpre}")`;
        conectionSql(sql);
    }
    if (newChannel.telefono) {
        let sql = sqlGral + ` ("telefono", "${newChannel.telefono}", ${newChannel.user_id}, "${newChannel.tpre}")`;
        conectionSql(sql);
    }
    if (newChannel.facebook) {
        let sql = sqlGral + ` ("facebook", "${newChannel.facebook}", ${newChannel.user_id}, "${newChannel.fpre}")`;
        conectionSql(sql);
    }
    if (newChannel.linkedin) {
        let sql = sqlGral + ` ("linkedin", "${newChannel.linkedin}", ${newChannel.user_id}, "${newChannel.lpre}")`;
        conectionSql(sql);
    }
    if (newChannel.slack) {
        let sql = sqlGral + ` ("slack", "${newChannel.slack}", ${newChannel.user_id}, "${newChannel.spre}")`;
        conectionSql(sql);
    }

    function conectionSql(sql) {
        connection.query(sql, function (err, channel) {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Asegurese de ingresar todos los datos' });
            }
        })
    }
    res.status(201).json({ message: 'Todo salio bien' });

}

function updateChannel(req, res) {

    let update = req.body;
    let channelId = req.params.id;

    let sql = `UPDATE channels
        SET channel_name ="${update.channel_name}",
        channel_username = "${update.channel_username}",
        user_id = ${update.user_id},
        preferences= ${update.preferences},
        WHERE id = ${channelId}`

    connection.query(sql, function (err, channel) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: "Asegurese de ingresar todos los datos para actualizar" });

        } else {
            res.status(200).json({ message: "channel updated", channel })
        }
    })

}

module.exports = {
    getChannelsById,
    insertChannels,
    updateChannel
}