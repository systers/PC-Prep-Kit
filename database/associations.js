module.exports = function(models) {
    const User = models.user_account;
    const Progress = models.progress;
    const Infokit = models.info_kit;
    const Verification = models.verification;
    const levelProgress = models.levelProgress;
    const activityProgress = models.activityProgress;

    // 1:1 relationship between User and Progress table
    Progress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(Progress, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    Infokit.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(Infokit, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    Verification.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(Verification, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    levelProgress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(levelProgress, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    activityProgress.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
    User.hasOne(activityProgress, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade'});
};

