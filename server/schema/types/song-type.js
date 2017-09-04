const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const Song = mongoose.model('song');

module.exports = new GraphQLObjectType({
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

const LyricType = require('./lyric-type');
