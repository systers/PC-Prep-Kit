const express = require('express');
const jwt    = require('jsonwebtoken');
const apiai = require('apiai');
const config = require('../config/settings');
const router = express.Router();
const models = require('../database/models');
const mail = require('./mailService');
const authenticationHelpers = require('./authenticationHelpers');
const doctor = require('./doctor');

const localUser = models.user_account;
const progress = models.progress;
const infokit = models.info_kit;

const fs = require('fs');
const multer = require('multer');
const winston = require('winston');

const codes = JSON.parse(fs.readFileSync('./data/codes.json'));
const errorCode = codes.errors;
const successCode = codes.success;

/**
 * Check if the request is authenticated
 * @param  {Object} req   Request object
 * @param  {Object} res   Response object
 * @param  {Function} next  Callback to the next function to be executed
 */
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let token;

    if (!req.body) {
        token = req.body.token;
    } else if (!req.query) {
        token = req.query.token;
    } else {
        token = req.headers['x-access-token'];
    }
    // decode token
    if (token) {
        // Removing quotes in the token
        token = token.substring(1, token.length - 1);

        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                return res.json({success: false, message: errorCode.PCE025.message, code: errorCode.PCE025.code});
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
            message: errorCode.PCE016.message,
            code: errorCode.PCE016.code
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
        }
    }).then(data => {
        const username = `${data[0].fname} ${data[0].lname}`;
        res.status(200).json({username: username});
    }).catch(error => {
        if (error) {
            res.status(500).json({error: errorCode.PCE017.message, code: errorCode.PCE017.code});
        }
    });
});

router.get('/user/badge', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (!req.user.email) {
        return res.status(400).json({error: errorCode.PCE021.message, code: errorCode.PCE021.code});
    }
    localUser.find({where: {
        email: req.user.email
    }}, {raw: true})
        .then(data => {
            if (!data) {
                return res.status(200).json({info: errorCode.PCE022.message, code: errorCode.PCE022.code});
            }
            progress.find({where: {
                user_id: data.id
            }}, {raw: true})
                .then(progressData => {
                    if (!progressData) {
                        return res.status(200).json({info: errorCode.PCE018.message, code: errorCode.PCE018.code});
                    }
                    const response = {badge: progressData.badge};
                    return res.status(200).json(response);
                })
                .catch(function() {
                    return res.status(500).json({error: errorCode.PCE019.message, code: errorCode.PCE019.code});
                });
        })
        .catch(function() {
            return res.status(500).json({error: errorCode.PCE020.message, code: errorCode.PCE020.code});
        });
});



router.patch('/user/badge/update', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (req.body) {
        localUser.find({
            where: {
                email: req.user.email
            },
            include: [progress]
        }, {raw: true})
            .then(data => {
                progress.update({
                    badge: req.body.badge
                }, {
                    where: {
                        id: data.progress.id
                    }
                })
                    .then(() => {
                        return res.status(200).json({info: successCode.PCS007.message, code: successCode.PCS007.code});
                    })

            })
            .catch(function() {
                return res.status(500).json({error: errorCode.PCE032.message, code: errorCode.PCE032.code});
            });
    } else {
        return res.status(400).json({error: errorCode.PCE029.message, code: errorCode.PCE029.code});
    }
});

/**
 * GET progress status API
 * @param  {String} '/getProgressStatus'                              URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect          Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                                      Anonymous function to handle request and response
 */
router.get('/getProgressStatus', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (!req.user.email) {
        return res.status(400).json({error: errorCode.PCE021.message, code: errorCode.PCE021.code});
    }
    localUser.find({where: {
        email: req.user.email
    }}, {raw: true})
        .then(data => {
            if (!data) {
                return res.status(200).json({info: errorCode.PCE022.message, code: errorCode.PCE022.code});
            }
            progress.find({where: {
                user_id: data.id
            }}, {raw: true})
                .then(progressData => {
                    if (!progressData) {
                        return res.status(200).json({info: errorCode.PCE018.message, code: errorCode.PCE018.code});
                    }
                    const response = {stage: progressData.stage, activity: progressData.activity};
                    return res.status(200).json(response);
                })
                .catch(function(err) {
                    return res.status(500).json({error: errorCode.PCE019.message, code: errorCode.PCE019.code});
                });
        })
        .catch(function(err) {
            return res.status(500).json({error: errorCode.PCE020.message, code: errorCode.PCE020.code});
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
        error ? res.status(500).json({error: errorCode.PCE023.message, code: errorCode.PCE023.code}) : res.json({message: 'Mail Sent Succesfully.'});
    });
});

/**
 * UPDATE progress status API
 * @param  {String} '/updateProgressStatus'                           URI of the resource
 * @param  {Function} authenticationHelpers.isAuthOrRedirect          Check if user is authenticated else redirect him back to login
 * @param  {Function} (req, res)                                      Anonymous function to handle request and response
 */
router.patch('/updateProgressStatus', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (req.body && req.body.stage && req.body.activity) {
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
                const stageDiff = currStage - progressStage;
                const activityDiff = currActivity - progressActivity;
                if ((currStage === progressStage && activityDiff === 1) || (stageDiff === 1 && (progressActivity === 3 || progressActivity === 0))) {
                    progress.update({
                        stage: currStage,
                        activity: currActivity
                    }, {
                        where: {
                            id: data.progress.id
                        }
                    })
                        .then(response => {
                            return res.status(200).json({info: successCode.PCS003.message, code: successCode.PCS003.code});
                        })
                } else if (stageDiff < 1 && activityDiff < 1) {
                    return res.status(200).json({info: successCode.PCS003.message, code: successCode.PCS003.code});
                } else {
                    return res.status(200).json({info: errorCode.PCE027.message, code: errorCode.PCE027.code});
                }
            })
            .catch(function(err) {
                return res.status(500).json({error: errorCode.PCE028.message, code: errorCode.PCE028.code});
            });
    } else {
        return res.status(400).json({error: errorCode.PCE029.message, code: errorCode.PCE029.code});
    }
});

router.get('/infokitactive', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (!req.user.email) {
        return res.status(400).json({error: errorCode.PCE021.message, code: errorCode.PCE021.code});
    }
    localUser.find({where: {
        email: req.user.email
    }}, {raw: true})
        .then(data => {
            if (!data) {
                return res.status(200).json({info: errorCode.PCE022.message, code: errorCode.PCE022.code});
            }
            infokit.find({where: {
                user_id: data.id
            }}, {raw: true})
                .then(infokitData => {
                    if (!infokitData) {
                        return res.status(200).json({info: errorCode.PCE026.message, code: errorCode.PCE026.code});
                    }
                    return res.status(200).json({infokitactive: infokitData});
                })
                .catch(function(err) {
                    return res.status(500).json({error: errorCode.PCE019.message, code: errorCode.PCE019.code});
                });
        })
        .catch(function(err) {
            return res.status(500).json({error: errorCode.PCE020.message, code: errorCode.PCE020.code});
        });
});

router.get('/activateinfokit', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    const activate = req.query.activate;
    const updateobj = {};
    updateobj[activate] = true;

    if (!req.user.email) {
        return res.status(400).json({error: errorCode.PCE021.message, code: errorCode.PCE021.code});
    }
    localUser.find({where: {
        email: req.user.email
    }}, {raw: true})
        .then(data => {
            if (!data) {
                return res.status(200).json({info: errorCode.PCE022.message, code: errorCode.PCE022.code});
            }
            infokit.update( updateobj, {
                where: {
                    user_id: data.id
                }
            }).then(function(data) {
                return res.json({message: successCode.PCS004.message, code: successCode.PCS004.code});
            }).catch(function(err) {
                return res.status(500).json({error: errorCode.PCE024.message, code: errorCode.PCE024.code});
            });
        })
        .catch(function(err) {
            return res.status(500).json({error: errorCode.PCE020.message, code: errorCode.PCE020.code});
        });
});

/**
 * [destination description]
 * @param  {Object} req       Request object
 * @param  {Object} file      File object
 * @param  {Function} cb      Callback function
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/assets/img/uploads/');
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
    fs.writeFile(`./src/assets/img/uploads/${Buffer.from(req.user.email).toString('base64')}.jpeg`, base64Data, 'base64', function(err) {
        winston.log(err);
    });
    res.send(req.files);
});

/**
 * Return JSON file contents
 * @param  {Object} '/getJSONData'  URI of the resource
 * @param  {Function} (req, res)    Anonymous function to handle request and response
 */
router.get('/getJSONData', (req, res) => {
    const uri = `./data/${req.query.file}`;
    res.status(200).json({data: fs.readFileSync(uri, 'utf8')});
});

router.post('/doctorchat', function(req, res) {
    const chatbot = apiai(config.apiai.clientToken);
    let request = chatbot.textRequest(req.body.message, {
        sessionId: req.sessionID
    });

    request.on('response', function(chatResponse) {

        let result = chatResponse.result;
        let reply = result.fulfillment.speech;

        if (!reply) {
            doctor(chatResponse, function(reply) {
                res.json({reply: reply});
            });
        } else {
            res.json({reply: reply});
        }
    });

    request.on('error', function(error) {
        if (error.status.code === 400) {
            res.json({reply: 'I am sorry, I did not understand, try changing the sentence a little.'});
        } else {
            res.json({reply: 'There seems to be some problem with the chat.'});
        }
    });

    request.end();
});

module.exports = router;
