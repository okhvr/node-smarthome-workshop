function corsMiddlware(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'COntent-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
}

module.exports = corsMiddlware;