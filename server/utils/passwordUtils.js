const crypto = require('crypto');

/**
 * Validate the incoming password
 * @param {string} password 
 * @param {string} hash 
 * @param {string} salt 
 * @returns {boolean}
 */
function validPassword(password,hash,salt) {
    let newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return newHash === hash;
}

/**
 * Generate the hash of a password and its own salt string
 * @param {string} password 
 * @returns {Object} {salt, hash}
 */
function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return { salt, hash };
}

module.exports = { genPassword, validPassword }