const { Pool } = require("pg");
const { config } = require("dotenv");

config(); // Load environment variables from .env file

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

const fetch = async (query, type, ...values) => {
    const client = await pool.connect();
    try {    
        if(type){
            const { rows: [row] } = await client.query(query, values);
            return row;
        } else {
            const { rows } = await client.query(query, values);
            return rows;
        }   
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
};

const getUsers = () => fetch(`SELECT * FROM users`);

module.exports = { fetch, getUsers };
