import client from "../../client";

export default {
  Query: {
    searchCoffeeShops: (_, { keyword }) => {
      return client.coffeeShop.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
      });
    },
  },
};
