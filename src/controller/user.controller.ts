import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    console.log(user) // call create user service
    return res.send(omit(user, 'password'));
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
