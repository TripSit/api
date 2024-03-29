'use strict';

const gql = require('graphql-tag');
const {
  VoidResolver,
  UUIDResolver,
  UnsignedIntResolver,
  UnsignedFloatResolver,
  DateTimeResolver,
  DurationResolver,
  EmailAddressResolver,
  URLResolver,
} = require('graphql-scalars');

exports.typeDefs = gql`
  scalar Void
  scalar UUID
  scalar UnsignedInt
  scalar UnsignedFloat
  scalar DateTime
  scalar Duration
  scalar EmailAddress
  scalar URL

  type MinMax {
    min: UnsignedFloat
    max: UnsignedFloat
  }
`;

exports.resolvers = {
  Void: VoidResolver,
  UUID: UUIDResolver,
  UnsignedInt: UnsignedIntResolver,
  UnsignedFloat: UnsignedFloatResolver,
  DateTime: DateTimeResolver,
  Duration: DurationResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
};
