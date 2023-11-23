import {get} from 'lodash'
import { FilterQuery, UpdateQuery } from "mongoose";
import sessionModel, { SessionDcoument } from "../models/session.model";
import { signJwt } from '../utils/jwt.utils';
import config from 'config'
import { findUser } from './user.service';
import { verifyJwt } from "../utils/jwt.utils";

export async function createSession(userId: string, userAgent: string) {
  const session = await sessionModel.create({user: userId, userAgent})
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDcoument>) {
  return sessionModel.find(query).lean(); // leans is same as to json
}

export async function updateSession(query: FilterQuery<SessionDcoument>, update: UpdateQuery<SessionDcoument>) {
  return sessionModel.updateOne(query, update);
}

export async function reIssueAcessToken ({refreshToken}: {refreshToken: string}) {
  const {decoded} = verifyJwt(refreshToken)

  if(!decoded ||!get(decoded, 'session')) return false

  const session = await sessionModel.findById(get(decoded,"session"))

  if(!session || !session.valid) return false

  const user = await findUser({_id: session.user})

  if(!user) return false

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15minutes
  );

  return accessToken
}