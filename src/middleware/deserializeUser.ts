import { Request, NextFunction, Response } from "express";
import { get } from "lodash";
import {verifyJwt} from '../utils/jwt.utils'
import { reIssueAcessToken } from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, 'headers.x-refresh')

  // const authorizationHeader = req.headers.authorization;
  // let accessToken = '';

  // if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
  //   accessToken = authorizationHeader.slice(7);
  // }

  if (!accessToken) {
    return next();
  }

  const {decoded, expired} = verifyJwt(accessToken)
  if(decoded) {
    res.locals.user = decoded
    return next()
  }

  if(expired && refreshToken) {
    const newAccessToken = await reIssueAcessToken({refreshToken})
    if(newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }

    const result = verifyJwt(newAccessToken)

    res.locals.user = result.decoded
    return next()
  }


  return next();
};


export default deserializeUser
