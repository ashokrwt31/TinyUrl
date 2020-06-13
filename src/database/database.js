const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost/shortUrldb";
const ShortURLModel = require('../model/urlModel');

const connectOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
mongoose.Promise = global.Promise;

const connect = () => {
mongoose.connect(mongoURI, connectOptions, (err, db)=> {
	if( err) console.log(`Error is `, err);
	console.log(`connect to MongoDB`);
 });
}

const deleteShortURL = (id) => {
    // ShortURLModel.deleteMany({ clicks: id }, function (err) {
    //     if (err) return handleError(err);
    //     else {
    //         console.log("Item deleted from db");    
    //     }
    // });
    ShortURLModel.deleteOne({ uid: id }, function (err) {
        if (err) return handleError(err);
        else {
            console.log("Item deleted from db");    
        }
    });
}

module.exports = {connect, deleteShortURL }; 