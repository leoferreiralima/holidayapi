import generateRoutes from '~/helpers/generateRoutes'
import cors from 'cors'
import express, { Express } from 'express'
import listEndpoints from 'express-list-endpoints'
import helmet from 'helmet'
import { injectable, multiInject } from 'inversify'
import morgan from 'morgan'

import { Controller } from './controllers/types'

@injectable()
export default class AppController {
  express: Express
  constructor(@multiInject('Controller') controllers: Controller[]) {
    this.express = express()
    this.middlewares()
    this.routes(controllers)
  }

  middlewares() {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(morgan('dev'))
  }

  routes(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.express.use(generateRoutes(controller))
    })

    this.express.get('', (_request, response) =>
      response.json(listEndpoints(this.express))
    )
  }

  listen(port: number) {
    this.express.listen(port)
  }
}
