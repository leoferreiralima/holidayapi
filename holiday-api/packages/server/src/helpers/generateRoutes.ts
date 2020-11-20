import { Controller } from '~/app/controllers/types'
import ValidationMiddleware from '~/app/middlewares/ValidationMiddleware'
import { Router } from 'express'

const modifierRoutes = ['store', 'update']
const detailRoutes = ['show', 'destroy', 'update']

type httpVerbs =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head'

interface MethodsHttpVerbs {
  [attribute: string]: httpVerbs
}
const httpVerbsObject: MethodsHttpVerbs = {
  index: 'get',
  show: 'get',
  update: 'put',
  store: 'post',
  destroy: 'delete'
}

export default function (controller: Controller) {
  const router = Router()
  const { route, validator, show, store, index, update, destroy } = controller

  const methods = { show, store, index, update, destroy }
  Object.entries(methods)
    .filter(([, methodImplementation]) => !!methodImplementation)
    .forEach(([methodName, methodImplementation]) => {
      const routeArgs: any[] = []
      if (detailRoutes.includes(methodName)) {
        routeArgs.push(`${route}/:id`)
      } else {
        routeArgs.push(route)
      }

      if (modifierRoutes.includes(methodName) && validator) {
        routeArgs.push(ValidationMiddleware(validator()))
      }

      routeArgs.push(methodImplementation?.bind(controller))

      const httpVerb = httpVerbsObject[methodName]

      router[httpVerb].call(router, ...routeArgs)
    })

  return router
}
