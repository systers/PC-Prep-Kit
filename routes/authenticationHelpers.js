
/**
 * Authentication helpers to determine if a user is logged in or not
 * before a route returns information to the response
 */

module.exports = {
    isAuthOrRedirect(req, res, next) {
        // check if the user is authenticated, else redirect to login page if not authenticated
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    isNotAuthOrRedirect(req, res, next) {
        // check if the user is not authenticated, else redirect to home page if authenticated
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    },
    isAuth(req, res, next) {
        // check if user is authenticated else return 401 status if not authenticated
        if (req.isAuthenticated()) {
            return next();
        }
        res.json({authenticated: false});
    },
    isNotAuth(req, res, next) {
        // check if user is authenticated or not
        if (!req.isAuthenticated()) {
            return next();
        }
        res.json({authenticated: true});
    }
}
