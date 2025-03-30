const WarpMemento = require('./WarpMemento');

class WarpCaretaker {
  constructor() {
    this.mementos = new Map();
  }

  saveMemento(userId, bannerType, state, result) {
    const key = `${userId}-${bannerType}`;
    const memento = new WarpMemento(userId, bannerType, state, result);
    this.mementos.set(key, memento);
    return memento;
  }

  getMemento(userId, bannerType) {
    const key = `${userId}-${bannerType}`;
    return this.mementos.get(key);
  }

  getAllMementos() {
    return Array.from(this.mementos.values());
  }

  clearMementos() {
    this.mementos.clear();
  }
}

module.exports = WarpCaretaker;
