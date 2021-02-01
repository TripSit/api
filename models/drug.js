'use strict';

const path = require('path');
const { Model } = require('objection');

module.exports = class Drug extends Model {
	static tableName = 'drugs';

	static relationMappings = {
		names: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-name'),
			join: {
				from: 'drugs.id',
				to: 'drug_names.drugId',
			},
		},
		routesOfAdministration: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-route-of-administration'),
			join: {
				from: 'drugs.id',
				to: 'drugRoutesOfAdministration.drugId',
			},
		},
		categories: {
			relation: Model.HasManyRelation,
			modelClass: path.join(__dirname, 'drug-category'),
			join: {
				from: 'drugs.id',
				to: 'drugCategories.drugId',
			},
		},
		articles: {
			relation: Model.ManyToManyRelation,
			modelClass: path.join(__dirname, 'article'),
			join: {
				from: 'drugs.id',
				through: {
					from: 'drugArticles.drugId',
					to: 'drugArticles.articleId',
				},
				to: 'articles.id',
			},
		},
	};
};
