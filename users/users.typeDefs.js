import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type User {
    id: String!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      githubUsername: String!
      password: String!
    ): CreateAccountResult!
  }

  type Query {
    seeProfile(username: String!): User
  }
`;
