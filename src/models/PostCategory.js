
const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER
    },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    });

    PostCategory.associate = ({ Category, BlogPost }) => {
      Category.belongsToMany(BlogPost, {
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory
    });

    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory
    });
  }

  return PostCategory;
};

module.exports = PostCategoryModel