'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('emp/login', 'UserController.login')
Route.post('emp/register', 'UserController.register')
Route.get('emp/getuser/:id', 'UserController.show').middleware('auth')
Route.get('emp/loggedIn','UserController.loggedIn')
Route.get('emp/loginCheck','UserController.loginCheck')

Route.post('api/uploadimg/:id','MongoDbDocumentController.uploadImg')
Route.get('api/index/','MongoDbDocumentController.index')
Route.post('api/delete/:id','MongoDbDocumentController.delete')
Route.get('api/downloadimg','MongoDbDocumentController.downloadImg')
Route.get('api/downloadit/:fileName','MongoDbDocumentController.downloadit')
Route.put('api/deleteimg','MongoDbDocumentController.deleteImg')




