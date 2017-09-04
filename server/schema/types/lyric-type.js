const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const Lyric = mongoose.model('lyric');

module.exports = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType, // eslint-disable-line no-use-before-define
      resolve(parentValue) {
        return Lyric.findById(parentValue).populate('song').then(lyric => {
          console.log(lyric);
          return lyric.song;
        });
      },
    },
  }),
});

const SongType = require('./song-type');
