const Blog = require('./Blog');
const User = require('./User');

Blog.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

module.exports = { Blog, User };
