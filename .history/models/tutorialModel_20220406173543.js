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
      validate: {
        isUnique: function (value, next) {
          Tutorial.find({
            where: { title: value },
            attributes: ["id"],
          });
        },
      },
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Tutorial;
};
