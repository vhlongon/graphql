const mongoose = require('mongoose');

const { Schema } = mongoose;

const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'lyric',
    },
  ],
});

SongSchema.statics.addLyric = function getSong(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id).then(song => {
    const newLyric = new Lyric({ content, song });
    song.lyrics.push(newLyric);
    return Promise.all([newLyric.save(), song.save()]).then(([l, s]) => s);
  });
};

SongSchema.statics.findLyrics = function getLyric(id) {
  return this.findById(id).populate('lyrics').then(song => song.lyrics);
};

const songSchema = mongoose.model('song', SongSchema);

module.exports = songSchema;
