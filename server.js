const path = require('path');
const express = require('express');
const cors = require ("cors");
const mysql = require('mysql'); 
const router = require("./routes/user_routes.js");
const antrianRoute = require("./routes/antrian_routes.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/antrian", antrianRoute);
app.use(express.static(path.join(__dirname, 'project RPL')));

//routing
app.use("/users", router);
app.use("/antrian", antrianRoute);

app.get('/', (req, res) => {
    // Tambahkan nama folder 'project RPL' di sini
    res.sendFile(path.join(__dirname, 'project RPL', 'home.html'));
});

app.listen(port, () => {
    console.log (`Server berjalan di port ${port}`);
})






