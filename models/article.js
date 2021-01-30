'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class Article extends Model {
	static tableName = 'articles';

	static relationMappings = {
		drugs: {
			relation: Model.ManyToManyRelation,
			modelClass: path.join(__dirname, 'drug'),
			join: {
				from: 'articles.id',
				through: {
					from: 'drugArticles.articleId',
					to: 'drugArticles.drugId',
				},
				to: 'drugs.id',
			},
		},
	};
};
