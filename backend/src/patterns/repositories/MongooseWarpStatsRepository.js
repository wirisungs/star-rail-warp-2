const WarpStats = require('../../models/WarpStats');
const IWarpStatsRepository = require('../interfaces/IWarpStatsRepository');

class MongooseWarpStatsRepository extends IWarpStatsRepository {
  async findOne(query) {
    return WarpStats.findOne(query);
  }

  async findOneAndUpdate(query, update, options) {
    return WarpStats.findOneAndUpdate(query, update, options);
  }
}

module.exports = MongooseWarpStatsRepository;
