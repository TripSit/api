'use strict';

const gql = require('fake-tag');
const { createClient } = require('./utils');

describe('Query', () => {
  describe('drug', () => {
    test.skip('Gets a drug by ID');
  });

  describe('drugs', () => {
    test.skip('Gets all drugs');

    test.skip('Gets all tests that contain the query');
  });
});

describe('Mutation', () => {
  describe('createDrug', () => {
    test.skip('Creates provided drug');
  });

  describe('updateDrug', () => {
    test.skip('Updates drug by ID');
  });

  describe('deleteDrug', () => {
    test.skip('Marks drug as deleted by ID');
  });

  describe('deleteDrugRoa', () => {
    test.skip('Deletes DrugRoa by ID');
  });
});

describe('Drug', () => {
  describe('aliases', () => {
    test.skip('Gets all drug aliases');
  });

  describe('roas', () => {
    test.skip('Gets all drug roas');
  });

  describe('psychonautwikiUrl', () => {
    test.skip('Forms URL else null');
  });
});

describe('DrugRoa', () => {
  test.skip('TODO');
});
