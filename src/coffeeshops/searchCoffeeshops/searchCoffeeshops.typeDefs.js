import { gql } from "apollo-server";

export default gql`
  type Query {
    searchCoffeeshops(keyword: String!): [CoffeeShop]
  }
`;
