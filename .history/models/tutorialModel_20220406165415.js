module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Tutorial;
};
