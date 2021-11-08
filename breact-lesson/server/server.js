import moment from "moment-timezone";
// ----------------- EXPRESS SERVER -----------------
// const express = require('express')
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

// const cors = require('cors')
import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
// const mysql = require('mysql')
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "eshop",
    password: "Laikinas1",
    database: "eshop",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// ----------------- ROUTING -----------------

// GET ALL RECORDS FROM TABLE
app.get('/stock/', (req, res) => {
    const sql = `
        select * from stock
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        // console.log(results);
        // console.log(moment.tz('2021-11-03T22:00:00.000Z', "Europe/Vilnius").format('YYYY-MM-DD'))
        // console.log('AAA ', results);
        // console.log('BBB ', fixDate(results));
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/stock', (req, res) => {
    const sql = `
        insert into stock
        (product, quantity, price, instock, lastorder)
        values (?, ?, ?, ?, ?)
    `
    con.query(sql, [req.body.product, req.body.quantity, req.body.price, req.body.instock||'0', req.body.lastorder.slice(0, 10)||'0001-01-01'], (err, results) => {
        if (err) throw err;
        // console.log(results);
        res.send(results)
    });
})


// EDIT RECORD 
app.put('/stock/:id', (req, res) => {
    // console.log(req.body.lastorder);
    const sql = `
        UPDATE stock
        SET product = ?, quantity = ?, price = ?, instock = ?, lastorder = ?
        WHERE id = ?
    `;
    con.query(sql, [
        req.body.product,
        req.body.quantity,
        req.body.price,
        req.body.instock,
        req.body.lastorder.slice(0, 10),
        req.params.id
    ], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


// DELETE RECORD 
app.delete('/stock/:id', (req, res) => {
    const sql = `
        DELETE FROM stock
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    })
})
// -------------------------------------------------




// GET DISTINCT TYPES
// app.get('/stock-types', (req, res) => {
//     const sql = `
//         SELECT DISTINCT type
//         FROM stock
//     `;
//     con.query(sql, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//     })
// })

// FILTER - GET DATA BY TYPE
app.get('/stock-filter/:t', (req, res) => {
    // console.log(typeof req.params.t, req.params.t);
    // console.log(req.params.t === '3');
    let sql;
    if(req.params.t === 'ASC') {
        sql = `
        SELECT * FROM stock
        order by price ASC
    `} else if(req.params.t === 'DESC') {
        sql = `
        SELECT * FROM stock
        order by price DESC
    `} else if(req.params.t === '1' || req.params.t === '0') {
        sql = `
        SELECT *
        FROM stock
        WHERE instock = ?
    `;
    }
    
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
        // console.log(results)
    })
})

// SEARCH DATA
// app.get('/stock-search', (req, res) => {
//     const searchText = (`%${req.query.s}%`).toLowerCase();
//     const sql = `
//         SELECT *
//         FROM stock
//         where LOWER(type) like ? OR LOWER(name) like ?
//     `;
//     con.query(sql, [searchText, searchText], (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//     })
// })


function fixDate(data) {
    return data.map((e, i) =>  {
        return({
            id: i+1,
            product: e.product,
            quantity: e.quantity,
            price: e.price,
            instock: e.instock,
            lastorder: moment.tz(e.lastorder, "Europe/Vilnius").format('YYYY-MM-DD')
        })
    })
}