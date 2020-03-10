const api = {
  platforms: {
    getPlatformsURL: 'https://api.rawg.io/api/platforms'
  },
  games: {
    getGamesUrl: 'https://api.rawg.io/api/games',
    params: {
      page: 'A page number within the paginated result set.',
      page_size: 'Number of results to return per page.',
      search: 'Search query.',
      platforms: 'Filter by platforms, for example: 4,5.',
      genres: 'Filter by genres, for example: 4,51 or action,indie.',
      tags: 'Filter by tags, for example: 31,7 or singleplayer,multiplayer.',
      dates:
        'Filter by a release date, for example: 2010-01-01,2018-12-31.1960-01-01,1969-12-31.',
      ordering: ['name', 'released', 'rating']
      // 'Available fields: name, released, added, created, rating. You can reverse the sort order adding a hyphen, for example: -released.'
    }
  },
  game: {
    getDetailsUrl: 'https://api.rawg.io/api/games/'
  }
};

export default api;
