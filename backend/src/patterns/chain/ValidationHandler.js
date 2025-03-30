const Handler = require('./Handler');

class ValidationHandler extends Handler {
  async handle(request) {
    // Validate user ID
    if (!request.userId) {
      throw new Error('User ID is required');
    }

    // Validate banner type
    if (!request.bannerType) {
      throw new Error('Banner type is required');
    }

    // Validate banner type values
    const validBannerTypes = ['beginner', 'weapon', 'character', 'standard'];
    if (!validBannerTypes.includes(request.bannerType.toLowerCase())) {
      throw new Error('Invalid banner type');
    }

    // Pass to next handler
    return super.handle(request);
  }
}

module.exports = ValidationHandler;
