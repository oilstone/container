class Binding {
    #container;

    #callback;
    
    #resolved = null;
    
    #isSingleton = false;
    
    constructor(container, callback) {
        this.#container = container;
        this.#callback = callback;
    }

    singleton() {
        this.#isSingleton = true;

        return this;
    }

    resolve() {
        if (this.#isSingleton) {
            if (this.#resolved) {
                return this.#resolved;
            }

            this.#resolved = this.#callback(this.#container);

            return this.#resolved
        }
        
        return this.#callback(this.#container);
    }
}

export default Binding;