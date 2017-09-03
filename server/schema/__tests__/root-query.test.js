import { GraphQLString } from 'graphql';
import { RootQuery, createRootQuery } from '../root-query';
import { UserType } from '../types/user';
import { CompanyType } from '../types/company';

describe('RootQuery', () => {
  it('is set correct name', () => {
    expect(RootQuery.name).toBe('RootQueryType');
  });

  describe('fields', () => {
    describe('User', () => {
      it('has the correct type', () => {
        const { user } = RootQuery.getFields();
        expect(user.type).toEqual(UserType);
      });

      it('has an id arg', () => {
        const { user } = RootQuery.getFields();
        expect(user.args.find(a => a.name === 'id').type).toEqual(
          GraphQLString
        );
      });
      describe('resolver', () => {
        it('calls getUser', () => {
          const getUser = jest.fn();
          const { user } = createRootQuery(getUser).getFields();
          const args = { id: 'id' };
          user.resolve({}, args);
          expect(getUser).toHaveBeenCalledWith(args.id);
        });
      });
    });

    describe('Company', () => {
      it('has the correct type', () => {
        const { company } = RootQuery.getFields();
        expect(company.type).toEqual(CompanyType);
      });

      it('has an id arg', () => {
        const { company } = RootQuery.getFields();
        expect(company.args.find(a => a.name === 'id').type).toEqual(
          GraphQLString
        );
      });
      describe('resolver', () => {
        it('calls getCompany', () => {
          const getCompany = jest.fn();
          const { user } = createRootQuery(getCompany).getFields();
          const args = { id: 'id' };
          user.resolve({}, args);
          expect(getCompany).toHaveBeenCalledWith(args.id);
        });
      });
    });
  });
});
