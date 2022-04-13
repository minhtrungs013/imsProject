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
          Model.find({
            where: { title: value },
            attributes: ["id"],
          }).done(function (error, user) {
            if (error) return next(error);

            if (user) return next("loi");

            next();
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
