const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const SongModel = require('../../models/song');

const createSongType = (Song = SongModel) =>
  new GraphQLObjectType({
    name: 'SongType',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      lyrics: {
        type: new GraphQLList(LyricType), // eslint-disable-line no-use-before-define
        resolve(parentValue) {
          return Song.findLyrics(parentValue.id);
        },
      },
    }),
  });

module.exports = {
  SongType: createSongType(),
  createSongType,
};

const { LyricType } = require('./lyric-type');
