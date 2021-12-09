import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processFile } from "../CoffeeShops.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, caption, file },
        { loggedInUser }
      ) => {
        let categoryObj = [];
        if (caption) {
          categoryObj = processCategories(caption);
        }
        let photoUrl = null;
        if (file) {
          photoUrl = await processFile(file, loggedInUser.id);
        }
        return client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(caption && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            ...(file && {
              photos: {
                create: {
                  url: photoUrl,
                },
              },
            }),
          },
        });
      }
    ),
  },
};
