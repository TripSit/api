'use strict';

const gql = require('graphql-tag');
const {
  VoidResolver,
  UUIDResolver,
  NonNegativeFloatResolver,
  NonNegativeIntResolver,
  DateTimeResolver,
  DurationResolver,
  EmailAddressResolver,
  URLResolver,
} = require('graphql-scalars');

exports.typeDefs = gql`
  scalar Void
  scalar UUID
  scalar NonNegativeInt
  scalar NonNegativeFloat
  scalar DateTime
  scalar Duration
  scalar EmailAddress
  scalar URL
`;

exports.resolvers = {
  Void: VoidResolver,
  UUID: UUIDResolver,
  NonNegativeInt: NonNegativeIntResolver,
  NonNegativeFloat: NonNegativeFloatResolver,
  DateTime: DateTimeResolver,
  Duration: DurationResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
};
