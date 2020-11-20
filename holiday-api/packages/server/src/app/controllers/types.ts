import { Request, Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import { Rules } from 'validatorjs'

export interface RequestHandler {
  (req: Request, res: Response, next: NextFunction): any
}

export interface ControllerHandlers {
  store?: RequestHandler
  index?: RequestHandler
  show?: RequestHandler
  update?: RequestHandler
  destroy?: RequestHandler
}

type ControllerMethods = keyof ControllerHandlers

export interface ControllerRouter {
  route: string
}

export interface ControllerValidator {
  validateMethods?: Array<ControllerMethods>
  validator?(): Rules
}

export type Controller = ControllerHandlers &
  ControllerRouter &
  ControllerValidator

@injectable()
export abstract class BaseController implements Controller {
  abstract route: string
  validateMethods?: ControllerMethods[] = ['store', 'update']
}
