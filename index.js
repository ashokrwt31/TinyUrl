const express = require('express');
const bodyParser = require('body-parser');
const ShortURLModel = require('./src/model/urlModel');
const moment = require('moment');
const db = require('./src/database/database');
const ShortId = require('./src/helper/shortId');
const flash = require('req-flash');
const session = require('express-session');
const flashMessage = require('./src/helper/flashMessage');
const cache = require("./src/cache/cache");
const PORT = process.env.PORT || 2000;
const app = express();

db.connect();
app.use(bodyParser.json());
app.use(
    session({
      secret: "This is app flash msg",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(flash()); 
app.set('view engine', 'ejs');
app.use("/static", express.static('./static/'));
app.use(express.urlencoded({extended: false}));

app.get('/', async(req, res) => {
    let flashMsg = flashMessage.checkFlashMessage(req); 
    const shortUrls = await ShortURLModel.find();
 	res.render('index', {shortUrls: shortUrls, moment: moment, data: { msg: flashMsg}});
});

app.post('/shortUrls', async(req, res) => {
    if (req.body.shortUrl) {
        const result = await ShortURLModel.find({ shortUrl: req.body.shortUrl });
        if (result.length !== 0) {
          req.flash('flashMsg', flashMessage.getFlashMessage("alias"));
          res.redirect("/");
          return;
        }
    }
    await ShortURLModel.create({originalUrl: req.body.fullUrl, timeExpire: req.body.timeExpire, 
    shortUrl: req.body.shortUrl  ? req.body.shortUrl : ShortId.generateShortId(), uid: ShortId.uuidGenerator() });
    res.redirect('/');

});

app.get('/:shortUrl', async(req,res) => {
    try {
        console.log("shortURLModel shortUrl try....",req.params);
   let shortURLModel = await cache.checkItemInCache("SaveCacheURL", req);
   console.log("shortURLModel shortUrl....",shortURLModel);
   if(shortURLModel == null)  {
      return res.sendStatus(404);
    }
   const timeDiff = Math.floor((Date.parse(new Date()) - Date.parse(shortURLModel.createAt)) / 60000);
   if(timeDiff >= shortURLModel.timeExpire) {
      req.flash('flashMsg', flashMessage.getFlashMessage("expire"));
      res.redirect("/");
      return
   } 
    shortURLModel.clicks++;
    shortURLModel.save();
    res.redirect(shortURLModel.originalUrl);
  } catch(err){
    res.sendStatus(404);
  }
});

app.post('/uid/:uid', async(req,res) => {
    try {
    const shortURLModel = await ShortURLModel.findOne({uid: req.params.uid});
    if(shortURLModel == null)  {
     return res.sendStatus(404);
     }
     db.deleteShortURL(shortURLModel.uid);
     req.flash('flashMsg', flashMessage.getFlashMessage("deleteSuccess"));
     cache.deleteItemFromCache(shortURLModel.shortUrl);
     res.redirect('/');
    } catch (err) {
        res.sendStatus(404);
    }
 });
 

app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});