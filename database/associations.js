module.exports = function(models) {
    const User = models.user_account;
    const Progress = models.progress;
    const Infokit = models.info_kit;
    Progress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    Infokit.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
}
