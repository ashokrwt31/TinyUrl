const redis = require("redis");
const mongoose = require("mongoose");
const util = require("util");
const ShortURLModel = require('../model/urlModel');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.hget = util.promisify(client.hget);

client.on('connect', function(err) {
    console.log('connected');
});


const addItemInCache = (hashKey, key, result) => {
    client.hset(hashKey, key, JSON.stringify(result));
}

const deleteItemFromCache = (key) => {
    client.del(key);
}

const checkItemInCache = async (key, req) => {
    let shortUrlModel = await getItemFromCache(key, req.params.shortUrl);
    if (!shortUrlModel || shortUrlModel === undefined || shortUrl === null) {
      shortUrlModel =  await ShortURLModel.findOne({shortUrl: req.params.shortUrl}); 
    }
    if (shortUrlModel.clicks >= 5) {
      addItemInCache("SaveCacheURL", req.params.shortUrl, shortUrl);
    }
    return shortUrlModel;
}

const getItemFromCache = async(hashKey, key) => {
    try{
        const result = await client.hget(hashKey, key);
        if (result) {
          const jsonResult = JSON.parse(result);
          return jsonResult;
        }
        return null;
    } catch(err) {
        return null;
    }
}

module.exports = { addItemInCache, deleteItemFromCache, getItemFromCache, checkItemInCache};