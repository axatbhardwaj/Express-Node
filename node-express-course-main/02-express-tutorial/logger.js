const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getTime();
    console.log({ method: method, url: url, timestamp: time });
    next()
}

module.exports = {
    logger
}