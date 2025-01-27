import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('Connected to database');

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection id detected, shutting down ...');
  if(server) {
      server.close(() => {
          process.exit(1);
      })
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException id detected, shutting down ...');
  if(server) {
      server.close(() => {
          process.exit(1);
      })
  }
  process.exit(1);
});