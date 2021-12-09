import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, githubUsername, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username / email is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        const createUser = await client.user.create({
          data: {
            username,
            email,
            name,
            githubUsername,
            password: uglyPassword,
          },
        });
        if (createUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "error",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
