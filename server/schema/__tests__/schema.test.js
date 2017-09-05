import schema from '../schema';
import { RootQuery } from '../root-query';
import { mutations } from '../mutations';

describe('Schema', () => {
  describe('root query', () => {
    it('has the correct value', () => {
      expect(schema.getQueryType()).toEqual(RootQuery);
    });
  });

  describe('mutation', () => {
    it('has the correct value', () => {
      expect(schema.getMutationType()).toEqual(mutations);
    });
  });
});
