import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { SongType, createSongType } from '../song-type';
import { LyricType } from '../lyric-type';
import SongModel from '../../../models/song';

describe('SongType', () => {
  it('is set the correct name', () => {
    expect(SongType.name).toBe('SongType');
  });

  describe('fields', () => {
    describe('id', () => {
      it('has the correct type', () => {
        const { id } = SongType.getFields();
        expect(id.type).toEqual(GraphQLID);
      });
    });

    describe('title', () => {
      it('has the correct type', () => {
        const { title } = SongType.getFields();
        expect(title.type).toEqual(GraphQLString);
      });
    });

    describe('lyrics', () => {
      it('has the correct type', () => {
        const { lyrics } = SongType.getFields();
        expect(lyrics.type).toEqual(new GraphQLList(LyricType));
      });

      describe('resolve', () => {
        it('calls findById on LyricModel', () => {
          const mockfindLyrics = jest.fn();
          const SongMockModel = SongModel;
          SongMockModel.findLyrics = mockfindLyrics;
          const { lyrics } = createSongType(SongMockModel).getFields();
          const id = 'id';
          const parentValue = { id };
          lyrics.resolve(parentValue);
          expect(mockfindLyrics).toHaveBeenCalledWith(id);
        });
      });
    });
  });
});
