let mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds133275.mlab.com:33275/sappy', { useNewUrlParser: true });

module.exports = mongoose;