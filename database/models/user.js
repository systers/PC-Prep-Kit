module.exports = function(sequelize, Sequelize) {
 
	const User = sequelize.define('user_account', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			unique: true
		},
		password: {
			type: Sequelize.STRING				
		},
		resetPasswordToken: {
			type: Sequelize.STRING  	
		},
		resetPasswordExpires: {
			type: Sequelize.DATE
		},
		provider: {
		    type:   Sequelize.ENUM,
		    values: ['local', 'google']
		},
		google_id: {
			type: Sequelize.STRING 
		},
		google_token: {
			type: Sequelize.STRING 
		}
	});
    return User;
}
