const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const LyricModel = require('../../models/lyric');

const createLyricType = (Lyric = LyricModel) =>
  new GraphQLObjectType({
    name: 'LyricType',
    fields: () => ({
      id: { type: GraphQLID },
      likes: { type: GraphQLInt },
      content: { type: GraphQLString },
      song: {
        type: SongType, // eslint-disable-line no-use-before-define
        resolve(parentValue) {
          const lyricFromSong = Lyric.findById(parentValue);
          return lyricFromSong
            ? lyricFromSong.populate('song').then(({ song }) => song)
            : null;
        },
      },
    }),
  });

module.exports = {
  LyricType: createLyricType(),
  createLyricType,
};

const { SongType } = require('./song-type');
