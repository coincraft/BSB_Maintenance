const express = require('express');
const { Pool } = require('pg');
const HOST = '0.0.0.0';
const PORT = 80

const app = express();

const pool = new Pool({ user: 'postgres', host: 'database' });

app.get('/', (req, res) => {
    res.send('Successful Request. Server working.');
});

//Get the number of tickets in db
app.get('/tickets/length', (req, res) => {
    pool.query('SELECT COUNT(*) FROM bsbmaint.tickets', (error, response) => {
        res.json(response.rows);
    });
});

//Fetch paginated list of 5 tickets
app.get('/tickets/:page', (req, res) => {
    const page = req.params.page;
    const ITEMS_PER_PAGE = 5;
    pool.query(`SELECT * FROM bsbmaint.tickets LIMIT ${ITEMS_PER_PAGE} OFFSET ${(page - 1) * ITEMS_PER_PAGE}`, (error, response) => {
        res.json(response.rows);
    });
});

//Fetch all tickets
app.get('/tickets-all', (req, res) => {
    pool.query('SELECT * FROM bsbmaint.tickets', (error, response) => {
        res.json(response.rows);
    });
});

//Fetch all tickets for specified member
app.get('/tickets/:member_id', (req, res) => {
    const event_id = req.params.event_id;
    pool.query(`SELECT * FROM bsbmaint.tickets WHERE member_id='${member_id}'`, (error, response) => {
        res.json(response.rows);
    });
});

app.listen(PORT, HOST);
console.log(`Running at ${HOST}:${PORT}`)