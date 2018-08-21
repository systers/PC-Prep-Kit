module.exports = function(router, passport, path) {
    /**
     * Load index page of Angular
     * @param  {Object} req  Request object
     * @param  {Object} res  Response object
     */
    router.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}
