import { schema } from '../schema';
import { RootQuery } from '../root-query';
import mutation from '../mutation';
import { UserType } from '../types/user';
import { CompanyType } from '../types/company';

describe('Schema', () => {
  describe('root query', () => {
    it('has the correct value', () => {
      expect(schema.getQueryType()).toEqual(RootQuery);
    });
  });

  describe('mutation', () => {
    it('has the correct value', () => {
      expect(schema.getMutationType()).toEqual(mutation);
    });

    describe('User', () => {
      it('sets the correct value for User query', () => {
        expect(schema.getTypeMap().User).toEqual(UserType);
      });
    });

    describe('Company', () => {
      it('sets the correct value for User query', () => {
        expect(schema.getTypeMap().Company).toEqual(CompanyType);
      });
    });
  });
});
