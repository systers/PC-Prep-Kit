const express = require('express');
const jwt    = require('jsonwebtoken');
const config = require('../config/settings');
const authenticationHelpers = require('./authenticationHelpers');
const router = express.Router();
const models = require('../database/models');
const mail = require('./mailService');

const localUser = models.user_account;
const progress = models.progress;

const fs = require('fs');
const multer = require('multer');
const winston = require('winston');

/**
 * Check if the request is authenticated
 * @param  {Object} req   Request object
 * @param  {Object} res   Response object
 * @param  {Function} next  Callback to the next function to be executed
 */
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token;

    if(!req.body) {
        token = req.body.token;
    } else if(!req.query) {
        token = req.query.token;
    } else {
        token = req.headers['x-access-token'];
    }
    // decode token
    if(token) {
        // Removing quotes in the token
        token = token.substring(1, token.length-1);

        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if(err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

/**
 * GET user information API
 * @param  {String} '/getUserInfo'                            URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect  Check if user is authenticated else redirect him back to login
 * @param  {Object} (req, res)                                Anonymous function to handle request and response
 */
router.get('/getUserInfo', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    res.status(200).json({user: req.user});
});

/**
 * GET username API
 * @param  {String} '/username'                               URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect  Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                              Anonymous function to handle request and response
 */
router.get('/username', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    const email = req.user.email;
    localUser.findAll({
        where: {
            email: email
        }}).then(data => {
            const username = `${data[0].fname} ${data[0].lname}`;
            res.status(200).json({username: username});
        }).catch(error => {
            if(error){
                res.status(500).json({error: 'Something went wrong'});
            }
        });
});

/**
 * GET progress status API
 * @param  {String} '/getProgressStatus'                              URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect          Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                                      Anonymous function to handle request and response
 */
router.get('/getProgressStatus', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if(!req.user.email) {
        return res.status(400).json({error: 'Email not provided'});
    }
    localUser.find({where: {
        email: req.user.email
    }}, {raw: true})
        .then(data => {
            if(!data) {
                return res.status(200).json({info: 'This account does not exist'});
            }
            progress.find({where: {
                user_id: data.id
            }}, {raw: true})
                .then(progressData => {
                    if(!progressData) {
                        return res.status(200).json({info: 'No data found'});
                    }
                    const response = {stage: progressData.stage, activity: progressData.activity};
                    return res.status(200).json(response);
                })
                .catch(function(err) {
                    return res.status(500).json({error: 'Something went wrong while fetching user progress data'});
                });
        })
        .catch(function(err) {
            return res.status(500).json({error: 'Something went wrong while fetching user data'});
        });
});

/**
 * GET mail policy API
 * @param  {String} '/mailpcpolicy'                                   URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect          Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                                      Anonymous function to handle request and response
 */
router.get('/mailpcpolicy', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    const email = req.user.email;
    mail.mailOptions.to = email;
    mail.mailOptions.subject = 'Peace Corps Policy';
    mail.mailOptions.html = '<H2> Peace Corps Policy </H2>';
    mail.smtpTransport.sendMail(mail.mailOptions, function(error) {
        error ? res.status(500).json({error: 'Something Went Wrong! Try again later.'}) : res.json({message: 'Mail Sent Succesfully.'});
    });
});

/**
 * UPDATE progress status API
 * @param  {String} '/updateProgressStatus'                           URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect          Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                                      Anonymous function to handle request and response
 */
router.put('/updateProgressStatus', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if(req.body && req.body.stage && req.body.activity) {
        const currStage = req.body.stage;
        const currActivity = req.body.activity;
        localUser.find({
            where: {
                email: req.user.email
            },
            include: [progress]
        }, {raw: true})
            .then(data => {
                const progressStage = data.progress.stage;
                const progressActivity = data.progress.activity;
                if((currStage===progressStage || (currStage-progressStage)===1) && ((currActivity-progressActivity)===1)){
                    progress.update({
                        stage: currStage,
                        activity: currActivity
                    }, {
                        where: {
                            id: data.progress.id
                        }
                    })
                        .then(response => {
                            return res.status(200).json({info: 'success'});
                        })
                } else if((currStage-progressStage)>1 && (currActivity-progressActivity)>1) {
                    return res.status(200).json({info: 'Illegal operation'});
                } else if((currStage-progressStage)<1 && (currActivity-progressActivity)<1) {
                    return res.status(200).json({info: 'success'});
                }
            })
            .catch(function(err) {
                return res.status(500).json({error: 'Something went wrong while updating progress status'});
            });
    } else {
        return res.status(400).json({error: 'No data recieved'});
    }
});

/**
 * [destination description]
 * @param  {Object} req       Request object
 * @param  {Object} file      File object
 * @param  {Function} cb      Callback function
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

/**
 * Function to upload browsed image
 * @param  {Object} req  Request object
 * @param  {Object} res  Response object
 */
router.post('/upload', upload.array('uploads[]', 12), function(req, res) {
    winston.log('files', req.files);
    res.send(req.files);
});

/**
 * Function to upload webcam/camera image
 * @param  {Object} req  Request object
 * @param  {Object} res  Response object
 */
router.post('/uploadCam', function(req, res) {
    const base64Data = req.body.base64.replace(/^data:image\/jpeg;base64,/, '');
    fs.writeFile('./uploads/out.jpeg', base64Data, 'base64', function(err) {
        winston.log(err);
    });
    res.send(req.files);
});

module.exports = router;

