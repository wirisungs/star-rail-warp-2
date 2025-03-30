class IWarpStatsRepository {
  async findOne(query) {
    throw new Error('Method findOne() must be implemented');
  }

  async findOneAndUpdate(query, update, options) {
    throw new Error('Method findOneAndUpdate() must be implemented');
  }
}

module.exports = IWarpStatsRepository;
