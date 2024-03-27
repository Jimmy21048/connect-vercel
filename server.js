const express = require('express');

const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://default:tT1vNhfM0VrA@ep-long-smoke-a4gtsh85-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
})

client.connect()
.then(() => {
    console.log("db connected succesfully");
})
.catch((err) => {
    console.log(err);
})



const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('home');
})
app.post('/postName', (req, res) => {
    const value = [req.body.myname]
    client.query("INSERT INTO names (name) VALUES ($1)",value, (err) => {
        if(err) {
            console.log(err);
            return;
        }
        console.log("Query executed succesfully");
        res.redirect('/');
    })
})

app.listen(process.env.PORT, () => {
    console.log('server listening at port ');
})