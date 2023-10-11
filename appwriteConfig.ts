import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('651d2ba78525fb690705');

export const database = new Databases(client);

export const storage = new Storage(client);