'use strict';

const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

Model.knex(Knex(knexConfig));
