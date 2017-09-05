import { GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { LyricType, createLyricType } from '../lyric-type';
import { SongType } from '../song-type';
import LyricModel from '../../../models/lyric';

describe('LyricType', () => {
  it('is set the correct name', () => {
    expect(LyricType.name).toBe('LyricType');
  });

  describe('fields', () => {
    describe('id', () => {
      it('has the correct type', () => {
        const { id } = LyricType.getFields();
        expect(id.type).toEqual(GraphQLID);
      });
    });
    describe('likes', () => {
      it('has the correct type', () => {
        const { likes } = LyricType.getFields();
        expect(likes.type).toEqual(GraphQLInt);
      });
    });
    describe('content', () => {
      it('has the correct type', () => {
        const { content } = LyricType.getFields();
        expect(content.type).toEqual(GraphQLString);
      });
    });

    describe('song', () => {
      it('has the correct type', () => {
        const { song } = LyricType.getFields();
        expect(song.type).toEqual(SongType);
      });

      describe('resolve', () => {
        it('calls findById on LyricModel', () => {
          const mockfindById = jest.fn();
          const LyricMockModel = LyricModel;
          LyricMockModel.findById = mockfindById;
          const { song } = createLyricType(LyricMockModel).getFields();
          const parentValue = {};
          song.resolve(parentValue);
          expect(mockfindById).toHaveBeenCalledWith(parentValue);
        });
      });
    });
  });
});
