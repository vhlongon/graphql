const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const SongType = require('./types/song-type');
const LyricType = require('./types/lyric-type');

const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const createRootQuery = (song = Song, lyric = Lyric) =>
  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      songs: {
        type: new GraphQLList(SongType),
        resolve() {
          return song.find({});
        },
      },
      song: {
        type: SongType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
          return song.findById(id);
        },
      },
      lyric: {
        type: LyricType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parnetValue, { id }) {
          return lyric.findById(id);
        },
      },
    }),
  });

module.exports = {
  RootQuery: createRootQuery(),
  createRootQuery,
};
