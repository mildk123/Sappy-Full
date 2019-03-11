
var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
    admin_Email: {
        type: String,
        required: true
    },
    admin_Password: {
        type: String,
        required: true
    }
});
var admin = mongoose.model('admin', adminSchema);

module.exports = admin;