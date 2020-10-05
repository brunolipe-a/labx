import { IocContract } from '@adonisjs/fold'

export default class AppProvider {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected $container: IocContract) {}

  public register() {
    // Register your own bindings
  }

  public boot() {
    // IoC container is ready
  }

  public shutdown() {
    // Cleanup, since app is going down
  }

  public ready() {
    // App is ready
  }
}
