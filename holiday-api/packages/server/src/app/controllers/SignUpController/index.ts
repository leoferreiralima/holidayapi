import { UserService } from '~/app/services/types'
import createValidatorRules from '~/helpers/createValidatorRules'
import { Request, Response } from 'express'
import { injectable, inject } from 'inversify'

import { BaseController } from '../types'
import { SignUpRequest } from './types'

@injectable()
export default class SignUpController extends BaseController {
  route = '/signup'
  private userService: UserService

  constructor(@inject('UserService') userService: UserService) {
    super()
    this.userService = userService
  }

  validator() {
    return createValidatorRules<SignUpRequest>({
      email: ['required', 'max:80', 'email'],
      name: ['required', 'max:80'],
      password: ['required', 'between:5,12', 'confirmed']
    })
  }

  async store?(request: Request, response: Response) {
    const signUpInfo = request.body as SignUpRequest

    return response
      .status(201)
      .json(await this.userService.registerUser(signUpInfo))
  }
}
