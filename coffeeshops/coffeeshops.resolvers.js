import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    categories: ({ id }) =>
      client.category.findMany({
        where: {
          shops: {
            some: { id },
          },
        },
      }),
  },
  Category: {
    shops: ({ id }, { page }, { loggedInUser }) => {
      return client.category
        .findUnique({
          where: {
            id,
          },
        })
        .shops();
    },
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: { some: { id } },
        },
      }),
  },
};
