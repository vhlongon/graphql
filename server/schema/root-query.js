const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const { SongType } = require('./types/song-type');
const { LyricType } = require('./types/lyric-type');

const LyricModel = mongoose.model('lyric');
const SongModel = mongoose.model('song');

const createRootQuery = (Song = SongModel, Lyric = LyricModel) =>
  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      songs: {
        type: new GraphQLList(SongType),
        resolve() {
          console.log('fetching songs');
          return Song.find({});
        },
      },
      song: {
        type: SongType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parentValue, { id }) {
          return Song.findById(id);
        },
      },
      lyric: {
        type: LyricType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve(parnetValue, { id }) {
          return Lyric.findById(id);
        },
      },
    }),
  });

module.exports = {
  RootQuery: createRootQuery(),
  createRootQuery,
};
