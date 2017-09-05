import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutations, createMutations } from '../mutations';
import { SongType } from '../types/song-type';
import { LyricType } from '../types/lyric-type';
import SongModel from '../../models/song';
import LyricModel from '../../models/lyric';

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
        // TODO: How to test these?
        xit('returns a new Song', () => {
          // const SongModelMock = jest.mock(SongModel);
          // console.log(SongModelMock);
          const SongModelMock = SongModel;
          const { addSong } = createMutations(SongModelMock).getFields();
          const title = 'title';
          const result = addSong.resolve({}, { title });

          expect(result).toEqual('banana');
        });
      });
    });

    describe('addLyricToSong', () => {
      it('has the correct type', () => {
        const { addLyricToSong } = mutations.getFields();
        expect(addLyricToSong.type).toEqual(SongType);
      });

      it('has a content arg', () => {
        const { addLyricToSong } = mutations.getFields();
        expect(
          addLyricToSong.args.find(a => a.name === 'content').type
        ).toEqual(GraphQLString);
      });

      it('has a songId arg', () => {
        const { addLyricToSong } = mutations.getFields();
        expect(addLyricToSong.args.find(a => a.name === 'songId').type).toEqual(
          GraphQLID
        );
      });

      describe('resolver', () => {
        it('calls Song.addLyric', () => {
          const addLyricMock = jest.fn();
          const SongModelMock = SongModel;
          SongModelMock.addLyric = addLyricMock;
          const { addLyricToSong } = createMutations(SongModelMock).getFields();
          const args = { content: 'content', songId: 'songId' };
          addLyricToSong.resolve({}, args);
          expect(addLyricMock).toHaveBeenCalledWith(args.songId, args.content);
        });
      });
    });

    describe('likeLyric', () => {
      it('has the correct type', () => {
        const { likeLyric } = mutations.getFields();
        expect(likeLyric.type).toEqual(LyricType);
      });

      it('has a content arg', () => {
        const { likeLyric } = mutations.getFields();
        expect(likeLyric.args.find(a => a.name === 'id').type).toEqual(
          GraphQLID
        );
      });

      describe('resolver', () => {
        it('calls Lyric.like', () => {
          const likeMock = jest.fn();
          const LyricModelMock = LyricModel;
          LyricModelMock.like = likeMock;
          const { likeLyric } = createMutations(
            SongModel,
            LyricModelMock
          ).getFields();
          const args = { id: 'id' };
          likeLyric.resolve({}, args);
          expect(likeMock).toHaveBeenCalledWith(args.id);
        });
      });
    });

    describe('deleteSong', () => {
      it('has the correct type', () => {
        const { deleteSong } = mutations.getFields();
        expect(deleteSong.type).toEqual(SongType);
      });

      it('has a content arg', () => {
        const { deleteSong } = mutations.getFields();
        expect(deleteSong.args.find(a => a.name === 'id').type).toEqual(
          GraphQLID
        );
      });

      describe('resolver', () => {
        it('calls Song.remove', () => {
          const removeMock = jest.fn();
          const SongModelMock = SongModel;
          SongModelMock.remove = removeMock;
          const { deleteSong } = createMutations(SongModel).getFields();
          const args = { id: 'id' };
          deleteSong.resolve({}, args);
          expect(removeMock).toHaveBeenCalledWith({ _id: args.id });
        });
      });
    });
  });
});
