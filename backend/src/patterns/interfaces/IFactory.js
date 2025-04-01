class IFactory {
    createService(type) {
        throw new Error('Method createService() must be implemented');
    }
}

module.exports = IFactory;
