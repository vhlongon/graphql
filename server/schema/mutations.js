const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const SongModel = require('../models/song');
const LyricModel = require('../models/lyric');
const { SongType } = require('./types/song-type');
const { LyricType } = require('./types/lyric-type');

const createMutations = (Song = SongModel, Lyric = LyricModel) =>
  new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addSong: {
        type: SongType,
        args: {
          title: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve(parentValue, { title }) {
          return new Song({ title }).save();
        },
      },
      addLyricToSong: {
        type: SongType,
        args: {
          content: { type: GraphQLString },
          songId: { type: GraphQLID },
        },
        resolve(parentValue, { content, songId }) {
          return Song.addLyric(songId, content);
        },
      },
      likeLyric: {
        type: LyricType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
          return Lyric.like(id);
        },
      },
      deleteSong: {
        type: SongType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
          return Song.remove({ _id: id });
        },
      },
      deleteLyric: {
        type: LyricType,
        args: { id: { type: GraphQLID } },
        resolve(parentValue, { id }) {
          return Lyric.remove({ _id: id });
        },
      },
    },
  });

module.exports = {
  mutations: createMutations(),
  createMutations,
};
