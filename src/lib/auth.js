import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    google:{
      clientId: process.env.GOOGLE_CLIEND_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  database: mongodbAdapter(db, {
    client,
  }),
});