import Binding from './binding';

class Container {
    #items = {};

    #providers = [];

    static make() {
        return new Container;
    }

    add(key, value) {
        this.#items[key] = value;
    }

    bind(key, callback) {
        this.#items[key] = new Binding(this, callback);

        return this
    }

    singleton(key, callback) {
        this.#items[key] = new Binding(this, callback).singleton();

        return this;
    }

    resolve(key) {
        let value = this.#items[key];

        if (value instanceof Binding) {
            return value.resolve();
        }

        return value;
    }

    provide(provider) {
        this.#providers.push(provider);

        provider.execute('register', this);

        return this;
    }

    boot() {
        const promises = [];

        this.#providers.forEach(provider => {
            promises.push(
                provider.execute('boot', this)
            );
        });

        return Promise.all(promises);
    }
}

export default Container;
