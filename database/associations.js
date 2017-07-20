module.exports = function(models) {
    const User = models.user_account;
    const Progress = models.progress;

    // 1:1 relationship between User and Progress table
    Progress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(Progress, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
}

