import mongoose from "mongoose";
import config from "config";
import logger from './logger'

async function connect() {
  const dburi = config.get<string>("dbUri");

  try {
    await mongoose.connect(dburi);
    logger.info('connected to db successfully')
  } catch (error) {
    logger.error("could not connect to db");
    process.exit(1);
  }
}

export default connect;
