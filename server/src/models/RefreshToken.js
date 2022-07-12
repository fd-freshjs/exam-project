const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  RefreshToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      tableName: 'RefreshTokens',
    },
  );
  return RefreshToken;
};
