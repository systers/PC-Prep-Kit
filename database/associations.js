module.exports = function(models) {
    const User = models.user_account;
    const Progress = models.progress;
    Progress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
}

