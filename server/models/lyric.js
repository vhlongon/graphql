const mongoose = require('mongoose');

const { Schema } = mongoose;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song',
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

LyricSchema.statics.like = id => {
  const Lyric = mongoose.model('lyric');

  return Lyric.findById(id).then(lyric => {
    const { likes } = lyric;
    const newLyric = lyric;
    newLyric.likes = likes + 1;
    return newLyric.save();
  });
};

mongoose.model('lyric', LyricSchema);
