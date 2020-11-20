import { SignUpRequest } from '~/app/controllers/SignUpController/types'
import { User } from '~/app/model'

export default interface UserService {
  registerUser(
    userInfo: Omit<SignUpRequest, 'password_confirmation'>
  ): Promise<Pick<User, 'id' | 'name' | 'email'>>
}
