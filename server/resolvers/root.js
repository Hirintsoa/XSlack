const pgClient = require('../database/params');

module.exports = () => {
    var res = {};
    pgClient.connect(err => {
        if(err) {
            res.error = err;
            console.warn(1, res);
        }
        else {
            pgClient.query('SELECT NOW() AS "theTime"', (err, result) => {
                if(err) {
                    pgClient.end()
                    .then(() => {
                        res.error = err;
                        console.error(2, res);
                    });
                }
                else {
                    pgClient.end()
                    .then(() => {
                        res.content = result.rows[0].theTime;
                        console.log(3, res);
                    });
                }
            });
        }
    });
    console.warn(4, res);
    return res.content || res.error;
}