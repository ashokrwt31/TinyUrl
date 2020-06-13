const mongoose = require('mongoose');
const {Schema} = mongoose;

const tinyUrlSchema = new Schema({
    uid: {type: String},
   	originalUrl: {type: String},
    shortUrl: {type: String},
    clicks: {type: Number, required: true, default: 0 },
    timeExpire: {type: Number, required: true, default: 0 },
	createAt: {type: Date, default: Date.now},
	updateAt: {type: Date, default: Date.now}
});

const Url = mongoose.model("urlModel", tinyUrlSchema);

module.exports = Url;