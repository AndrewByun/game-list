const pg = require('pg');
const {Pool} = require('pg');
var PG_URI = 'postgresql://andrewbyun1:0OxhaETfvq8I@ep-still-limit-a6sh2pmv-pooler.us-west-2.aws.neon.tech/gamelistDB?sslmode=require';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    pool,
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};