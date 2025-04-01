const IFactory = require('../interfaces/IFactory');
const BannerService = require('../../services/BannerService');
const WarpService = require('../../services/WarpService');
const AuthService = require('../../services/AuthService');

class ServiceFactory extends IFactory {
    constructor() {
        super();
    }

    createService(type) {
        switch(type.toLowerCase()) {
            case 'banner':
                return new BannerService();
            case 'warp':
                return new WarpService();
            case 'auth':
                return new AuthService();
            default:
                throw new Error(`Service type ${type} is not supported`);
        }
    }
}

module.exports = ServiceFactory;
