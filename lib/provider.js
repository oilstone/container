class Provider {
  #hooks = {
    register: [],
    boot: []
  }

  #promisableHooks = [
    'boot'
  ]

  register (callback) {
    this.#hooks.register.push(callback)

    return this
  }

  boot (callback) {
    this.#hooks.boot.push(callback)

    return this
  }

  execute (hook, container) {
    if (this.#promisableHooks.indexOf(hook) !== -1) {
      return this.#executePromisableHook(hook, container)
    }

    return this.#executeHook(hook, container)
  }

  #executeHook (hook, container) {
    this.#hooks[hook].forEach(callback => {
      callback(container)
    })

    return this
  }

  #executePromisableHook (hook, container) {
    return Promise.all(this.#hooks[hook].map(callback => {
      return callback(container)
    }))
  }
}

export default Provider
