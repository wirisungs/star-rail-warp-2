const IdleState = require('./IdleState');
const WarpingState = require('./WarpingState');
const WarpCaretaker = require('../memento/WarpCaretaker');

class WarpController {
  constructor(userId, bannerType, bannerService) {
    this.userId = userId;
    this.bannerType = bannerType;
    this.bannerService = bannerService;
    this.eventEmitter = bannerService.eventEmitter;
    this.result = null;
    this.caretaker = new WarpCaretaker();

    // Initialize states
    this.idleState = new IdleState();
    this.warpingState = new WarpingState();

    // Set initial state
    this.currentState = this.idleState;
  }

  setState(state) {
    this.currentState = state;
    this.saveState();
  }

  setResult(result) {
    this.result = result;
    this.saveState();
  }

  saveState() {
    this.caretaker.saveMemento(
      this.userId,
      this.bannerType,
      this.currentState.name,
      this.result
    );
  }

  restoreState() {
    const memento = this.caretaker.getMemento(this.userId, this.bannerType);
    if (memento) {
      const state = memento.getState();
      this.currentState = state.state === 'idle' ? this.idleState : this.warpingState;
      this.result = state.result;
      return state;
    }
    return null;
  }

  async startWarp() {
    await this.currentState.startWarp(this);
  }

  async completeWarp() {
    await this.currentState.completeWarp(this);
  }

  async cancelWarp() {
    await this.currentState.cancelWarp(this);
  }

  canStartWarp() {
    return this.currentState.canStartWarp();
  }

  canCompleteWarp() {
    return this.currentState.canCompleteWarp();
  }

  canCancelWarp() {
    return this.currentState.canCancelWarp();
  }
}

module.exports = WarpController;
