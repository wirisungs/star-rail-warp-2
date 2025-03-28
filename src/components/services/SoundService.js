class SoundService {
  constructor() {
    this.sounds = {
      'menu-open': new Audio('/assets/audio/sfx/menu-open.mp3'),
      'menu-close': new Audio('/assets/audio/sfx/menu-close.mp3'),
      'menu-select': new Audio('/assets/audio/sfx/menu-select.mp3'),
      'menu-button-select': new Audio('/assets/audio/sfx/menu-button-select.mp3'),
      'button-select': new Audio('/assets/audio/sfx/button-select.mp3'),
      'button-cancel': new Audio('/assets/audio/sfx/button-cancel.mp3'),
      'modal-open': new Audio('/assets/audio/sfx/modal-open.mp3'),
      'modal-close': new Audio('/assets/audio/sfx/modal-close.mp3'),
      'page-open': new Audio('/assets/audio/sfx/page-open.mp3'),
      'page-close': new Audio('/assets/audio/sfx/page-close.mp3'),
      'five': new Audio('/assets/audio/sfx/five.mp3'),
      'four': new Audio('/assets/audio/sfx/four.mp3'),
      'three': new Audio('/assets/audio/sfx/three.mp3'),
      'db-load': new Audio('/assets/audio/sfx/db-load.mp3'),
      'db-select': new Audio('/assets/audio/sfx/db-select.mp3'),
      'db-menu-open': new Audio('/assets/audio/sfx/db-menu-open.mp3'),
      'db-menu-close': new Audio('/assets/audio/sfx/db-menu-close.mp3'),
      'db-exit': new Audio('/assets/audio/sfx/db-exit.mp3'),
      'phono-open-1': new Audio('/assets/audio/sfx/phono-open-1.mp3'),
      'phono-open-2': new Audio('/assets/audio/sfx/phono-open-2.mp3'),
      'phono-close': new Audio('/assets/audio/sfx/phono-close.mp3'),
      'phono-select': new Audio('/assets/audio/sfx/phono-select.mp3'),
      'phono-album-select': new Audio('/assets/audio/sfx/phono-album-select.mp3'),
      'phono-track-select-1': new Audio('/assets/audio/sfx/phono-track-select-1.mp3'),
      'phono-track-select-2': new Audio('/assets/audio/sfx/phono-track-select-2.mp3')
    };
    this.isEnabled = localStorage.getItem('sound') !== 'false';
  }

  playSound(type) {
    if (!this.isEnabled) return;

    const sound = this.sounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.log('Sound play failed:', error));
    }
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('sound', this.isEnabled);
  }

  isSoundEnabled() {
    return this.isEnabled;
  }
}

// Create a singleton instance
const soundService = new SoundService();
export default soundService;
