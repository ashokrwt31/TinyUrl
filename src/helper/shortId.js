const shortId = require('shortid');

const generateShortId = () => {
        return shortId.generate();
}

const uuidGenerator = () => {
        return shortId.generate();
}

module.exports = {generateShortId, uuidGenerator};