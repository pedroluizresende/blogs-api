const BlogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
   {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false
   })

   BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'posts'
    })
  }
   return BlogPost
};

module.exports = BlogPostModel