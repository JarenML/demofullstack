const { Pool } = require('pg');

class Database {
    constructor(){
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'ventasdb',
            password: 'jaren1234',
            port: 5432
        })
    }

    query(text, params){
        return this.pool.query(text, params);
    
    }
}

module.exports = new Database()
