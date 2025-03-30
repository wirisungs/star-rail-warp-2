const Singleton = require('../Singleton');

class CommandInvoker extends Singleton {
  constructor() {
    super();
    if (this.initialized) return;

    this.commandHistory = [];
    this.undoStack = [];
    this.initialized = true;
  }

  async executeCommand(command) {
    try {
      const result = await command.execute();
      this.commandHistory.push(command);
      this.undoStack = []; // Clear undo stack when new command is executed
      return result;
    } catch (error) {
      console.error('Error executing command:', error);
      throw error;
    }
  }

  async undo() {
    if (this.commandHistory.length === 0) {
      throw new Error('No commands to undo');
    }

    const command = this.commandHistory.pop();
    await command.undo();
    this.undoStack.push(command);
  }

  async redo() {
    if (this.undoStack.length === 0) {
      throw new Error('No commands to redo');
    }

    const command = this.undoStack.pop();
    await this.executeCommand(command);
  }

  getCommandHistory() {
    return [...this.commandHistory];
  }

  clearHistory() {
    this.commandHistory = [];
    this.undoStack = [];
  }

  reset() {
    this.clearHistory();
    this.initialized = false;
  }
}

module.exports = CommandInvoker;
