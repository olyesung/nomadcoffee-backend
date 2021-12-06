import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    otherFields: Boolean!
  }
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      password: String
      avatarURL: Upload
      githubUsername: String
      bio: String
    ): EditProfileResult!
    singleUpload(file: Upload!): File!
  }
`;
