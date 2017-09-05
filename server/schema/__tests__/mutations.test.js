import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutations, createMutations } from '../mutations';
import { SongType } from '../types/song-type';
import SongModel from '../../models/song';

// jest.mock('../../models/song');
// const SongMock = require('../../models/song');

describe('mutations', () => {
  it('works', () => {
    expect(mutations).toBeTruthy();
  });

  describe('fields', () => {
    describe('addSong', () => {
      it('has the correct type', () => {
        const { addSong } = mutations.getFields();
        expect(addSong.type).toEqual(SongType);
      });

      it('has an title arg', () => {
        const { addSong } = mutations.getFields();
        expect(addSong.args.find(a => a.name === 'title').type).toEqual(
          GraphQLString
        );
      });

      describe('resolver', () => {
        // it('returns a new Song', () => {
          // const SongModelMock = jest.mock(SongModel);
          // console.log(SongModelMock);
          // const { addSong } = createMutations(SongModelMock).getFields();
          // console.log(addSong);
          // const title = 'title';
          // const result = addSong.resolve({}, { title });
          // expect(result).toEqual('banana');
        });
      });
    });
  });
});
