import { injectable } from 'inversify'

import { SignUpRequest } from '../controllers/SignUpController/types'
import { User } from '../model'
import UserService from './types/UserService'

@injectable()
export default class UserServiceImpl implements UserService {
  async registerUser({
    name,
    email,
    password
  }: Omit<SignUpRequest, 'password_confirmation'>) {
    const registeredUser = new User()
    registeredUser.name = name
    registeredUser.email = email
    registeredUser.password = password

    await registeredUser.save()

    return {
      id: registeredUser.id,
      email: registeredUser.email,
      name: registeredUser.name
    }
  }
}
