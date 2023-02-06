const bcrypt = require('bcryptjs');


const help = {};

help.Encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

help.Compare = async (password, dbPassword) => {
    const compare = await bcrypt.compare(password, dbPassword);
    return compare;
}


module.exports = { help };