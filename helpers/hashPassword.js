const crypto = require('crypto');

const hashPass = (password)=> {
    const secret = 'secret';
    const hash = crypto.createHmac('sha256',secret)
                        .update(password)
                        .digest('hex')
    return hash
}

module.exports = hashPass

