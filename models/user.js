var bcrypt = require("bcrypt-nodejs");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/906416_10103157316469369_986850834_o.jpg?_nc_cat=107&_nc_ht=scontent-atl3-1.xx&oh=58d0afe627c2ff41d44c96260d5827b2&oe=5C7054B7",
      validate: {
        isUrl: true
      }
    }
  });
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  
  return User;
};
