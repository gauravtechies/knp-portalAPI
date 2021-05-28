
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    path: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    underscored: true,
    tableName: 'videos',
    paranoid: true,
  });

  return Video;
};
