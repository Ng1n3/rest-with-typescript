import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validates from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHanlder } from "./controller/session.controller";
import {createSesionSchema} from './schema/session.schema'
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  
  app.post("/api/users", validates(createUserSchema),createUserHandler);
  
  app.post("/api/sessions", validates(createSesionSchema),createUserSessionHandler);

  app.get('/api/sessions', requireUser, getUserSessionsHanlder)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)
}

export default routes;

