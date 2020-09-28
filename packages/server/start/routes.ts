/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'connected' }
})

Route.post('/sessions', 'SessionsController.store')
Route.post('/users', 'UsersController.store')
Route.post('/reset-password', 'ForgotPasswordsController.store')
Route.post('/change-password', 'ForgotPasswordsController.update')

Route.get('/healthz', async () => {
  return HealthCheck.getReport()
})
