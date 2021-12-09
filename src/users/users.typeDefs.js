import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    bio: String
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
