const express = require("express");
const routes = express.Router();

const Admin = require('../Model/admin')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// ///////////////// admins List ////////////////////
routes.post("/register", (req, res) => {
    console.log('registering admin')
    const user = req.body;
    const hash = hashPassword(user.password);

    const newAdmin = new Admin({ admin_Email: user.email, admin_Password: hash });
    const token = jwt.sign({ user: user[0] }, 'sappy_125');

    newAdmin.save()
        .then(() => res.json({ message: "Admin registered successfully!", match: true, token: token, }))
        .catch(e => res.status(500).send({ message: e.message, match: false }));
})

routes.post("/login", async (req, res) => {
    console.log('Authenticating Admin');

    //Check Email
    const currentAdmin = await Admin.find({ admin_Email: req.body.email });
    
    if (!currentAdmin.length) {
        res.status(500).send({ message: "Incorrect Email/Password!", match: false });
        return;
    }

    //Compare Email
    const passwordMatched = await bcrypt.compareSync(req.body.password, currentAdmin[0].admin_Password);

    if (!passwordMatched) {
        res.status(500).send({ message: "Incorrect Email/Password!", match: false });
        return;
    }

    //Generate Token
    const token = await jwt.sign({ user: currentAdmin[0] }, 'sappy_125');

    res.send({ token: token, match: true });
})


function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}


module.exports = routes;