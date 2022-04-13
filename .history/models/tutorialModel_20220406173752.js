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
          })
            .then(function (tutorial) {
              // reject if a different user wants to use the same email
              if (tutorial) {
                return next("loi");
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
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
