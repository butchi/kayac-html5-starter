import EventEmitter from 'events';

export default class KayacHtml5Starter extends EventEmitter {
    constructor (opts = {}) {
        super();
        this.name = opts.name;
    }

    say () {
        alert(`Hello, ${this.name}!`);
    }
};

window.KayacHtml5Starter = KayacHtml5Starter;
