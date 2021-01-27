class Provider {
    #hooks = {
        register: [],
        boot: []
    };

    register(callback) {
        this.#hooks.register.push(callback);

        return this;
    }

    boot(callback) {
        this.#hooks.boot.push(callback);

        return this;
    }

    execute(hook, container) {
        this.#hooks[hook].forEach(callback => {
            callback(container);
        });

        return this;
    }
}

export default Provider;