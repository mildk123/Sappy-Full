const express = require("express");
const router = express.Router();

const Users = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


// ///////////////// Authentication ////////////////////
router.post("/register", (req, res) => {
    console.log('register User')
    const user = req.body;
    const hash = hashPassword(user.password);

    const newUser = new Users({ 
        email: user.email, 
        password: hash, 
        fname: user.fname, 
        lname: user.lname 
    });
    const token = jwt.sign({ user: user[0] }, 'sappy_125');

    newUser.save()
        .then(() => res.json({ message: "User registered successfully!", match: true, token: token, }))
        .catch(e => res.status(500).send({ message: e.message, match: false }));
})

router.post("/login", async (req, res) => {
    console.log('Authenticating User');

    //Check Email
    const user = await Users.find({ email: req.body.email });

    if (!user.length) {
        res.status(500).send({ message: "Incorrect Email/Password!", match: false });
        return;
    }

    //Compare Email
    const passwordMatched = await bcrypt.compareSync(req.body.password, user[0].password);

    if (!passwordMatched) {
        res.status(500).send({ message: "Incorrect Email/Password!", match: false });
        return;
    }

    //Generate Token
    const token = await jwt.sign({ user: user[0] }, 'emp_mgnt112');

    res.send({ token: token, match: true });
})




function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

module.exports = router;