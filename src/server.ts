import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";


async function main() {
    try {
        await mongoose.connect(config.databaseUrl as string);
        console.log("Connected to database");
        
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();