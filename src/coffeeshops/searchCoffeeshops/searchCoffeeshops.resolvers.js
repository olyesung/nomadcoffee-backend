import client from "../../client";

export default {
  Query: {
    searchCoffeeshops: (_, { keyword }) => {
      return client.coffeeShop.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
      });
    },
  },
};
