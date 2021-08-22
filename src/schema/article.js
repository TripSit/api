'use strict';

const gql = require('graphql-tag');
const { ARTICLE_BASE_PATH } = require('../env');

exports.typeDefs = gql`
  extend type Query {
    article(articleId: UUID!): Article!
  }

  type Article {
    id: ID!
    title: String!
    description: String
    url: URL!
    createdAt: DateTime!
  }
`;

exports.resolvers = {
  Query: {
    async article(root, { articleId }, { dataSources }) {
      return dataSources.db.article.findById(articleId);
    },
  },

  Article: {
    url(article) {
      return {
        ...article,
        url: `${ARTICLE_BASE_PATH}${article.id}`,
      };
    },
  },
};
