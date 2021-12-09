import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int
    url: String
    shop: CoffeeShop
  }

  type CoffeeShop {
    id: Int!
    name: String
    user: User!
    latitude: String
    longitude: String
    caption: String
    file: String
    photos: [CoffeeShopPhoto]
    categories: [Category]
  }

  type Category {
    id: Int!
    name: String!
    slug: String
    shops(page: Int!): [CoffeeShop]
    totalShops: Int!
  }
`;
