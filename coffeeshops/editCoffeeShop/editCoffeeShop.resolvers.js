import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processFile } from "../CoffeeShops.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, caption, file },
        { loggedInUser }
      ) => {
        let beforeCategory = [];
        if (caption) {
          beforeCategory = await client.coffeeShop.findFirst({
            where: { id, userId: loggedInUser.id },
            include: { categories: { select: { name: true } } },
          });
        }
        let beforePhoto = null;
        let photoUrl = null;
        if (file) {
          beforePhoto = await client.coffeeShop.findFirst({
            where: { id, userId: loggedInUser.id },
            include: { photos: { select: { url: true } } },
          });
          photoUrl = await processFile(file, loggedInUser.id);
        }

        if (!beforeCategory) {
          return {
            ok: false,
            error: "Coffee shop not found.",
          };
        }
        if (!beforePhoto) {
          return {
            ok: false,
            error: "Coffee shop photo not found.",
          };
        }
        await client.coffeeShop.update({
          where: { id },

          data: {
            name,
            latitude,
            longitude,

            ...(caption && {
              categories: {
                disconnect: beforeCategory.categories,
                connectOrCreate: processCategories(caption),
              },
            }),

            ...(file && {
              photos: {
                deleteMany: beforePhoto.photos,
                create: { url: photoUrl },
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
