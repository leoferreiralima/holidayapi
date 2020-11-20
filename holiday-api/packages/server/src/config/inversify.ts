import 'reflect-metadata'

import { UserServiceImpl } from '~/app/services'
import { UserService } from '~/app/services/types'
import { Container } from 'inversify'

import * as Controllers from '@app/controllers'
import { Controller } from '@app/controllers/types'
import AppController from '@app/index'

const inversifyContainer = new Container()

inversifyContainer.bind(AppController).to(AppController)

Object.values(Controllers).forEach(controller =>
  inversifyContainer.bind<Controller>('Controller').to(controller)
)

inversifyContainer.bind<UserService>('UserService').to(UserServiceImpl)

export default inversifyContainer
