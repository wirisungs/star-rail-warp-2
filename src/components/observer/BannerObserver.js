class BannerObserver {
  constructor() {
    this.observers = new Set();
  }

  // Add observer
  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  // Notify all observers
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

// Create a singleton instance
const bannerObserver = new BannerObserver();
export default bannerObserver;
