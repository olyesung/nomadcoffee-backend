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
    photos: ({ id }, { lastId }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .photos({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
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
  CoffeeShopPhoto: {
    shop: ({ coffeeShopId }) =>
      client.shop.findUnique({ where: { id: coffeeShopId } }),
  },
};
