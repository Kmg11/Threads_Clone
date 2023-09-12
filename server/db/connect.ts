import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	const MONGODB_URL = process.env.MONGODB_URL;

	if (!MONGODB_URL) {
		console.log("MONGODB_URL not found");
		return;
	}

	if (isConnected) {
		return;
	}

	try {
		await mongoose.connect(MONGODB_URL);
		isConnected = true;
		console.log("Connected to database");
	} catch (error) {
		console.log("Error connecting to database", error);
	}
};
