const { Pool } = require('pg');

class Database {
    constructor(){
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres-dev',
            password: 'admin',
            port: 5433
        })
    }

    query(text, params){
        return this.pool.query(text, params);
    
    }
}

module.exports = new Database()
