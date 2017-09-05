import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { RootQuery, createRootQuery } from '../root-query';
import { SongType } from '../types/song-type';
import SongModel from '../../models/song';

describe('RootQuery', () => {
  it('is set correct name', () => {
    expect(RootQuery.name).toBe('RootQueryType');
  });

  describe('fields', () => {
    describe('songs', () => {
      it('has the correct type', () => {
        const { songs } = RootQuery.getFields();
        expect(songs.type).toEqual(new GraphQLList(SongType));
      });

      describe('resolver', () => {
        it('calls Song.find', () => {
          const mockFind = jest.fn();
          const SongMockModel = SongModel;
          SongMockModel.find = mockFind;
          const { songs } = createRootQuery(SongMockModel).getFields();
          songs.resolve({}, {});
          expect(mockFind).toHaveBeenCalledWith({});
        });
      });
    });

    describe('song', () => {
      it('has the correct type', () => {
        const { song } = RootQuery.getFields();
        expect(song.type).toEqual(SongType);
      });

      it('has an id arg', () => {
        const { song } = RootQuery.getFields();
        expect(song.args.find(a => a.name === 'id').type).toEqual(
          new GraphQLNonNull(GraphQLID)
        );
      });
      describe('resolver', () => {
        it('calls Lyric.findById', () => {
          const mockFindById = jest.fn();
          const LyricMockModel = SongModel;
          LyricMockModel.findById = mockFindById;
          const { lyric } = createRootQuery(
            SongModel,
            LyricMockModel
          ).getFields();
          const args = { id: 'id' };
          lyric.resolve({}, args);
          expect(mockFindById).toHaveBeenCalledWith(args.id);
        });
      });
    });
  });
});
