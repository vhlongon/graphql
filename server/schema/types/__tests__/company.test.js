import { GraphQLString, GraphQLList } from 'graphql';
import { createCompanyType, CompanyType } from '../company';
import { UserType } from '../../types/user';

describe('Company', () => {
  it('is set the correct name', () => {
    expect(CompanyType.name).toBe('Company');
  });

  describe('fields', () => {
    describe('id', () => {
      it('has the correct type', () => {
        const { id } = CompanyType.getFields();
        expect(id.type).toEqual(GraphQLString);
      });
    });
    describe('name', () => {
      it('has the correct type', () => {
        const { name } = CompanyType.getFields();
        expect(name.type).toEqual(GraphQLString);
      });
    });
    describe('description', () => {
      it('has the correct type', () => {
        const { description } = CompanyType.getFields();
        expect(description.type).toEqual(GraphQLString);
      });
    });
    describe('users', () => {
      const getUsersFromCompany = jest.fn();
      const c = createCompanyType(getUsersFromCompany);
      const { users } = c.getFields();
      it('has the correct type', () => {
        expect(users.type).toEqual(new GraphQLList(UserType));
      });

      describe('resolve', () => {
        it('calls getUsersFromCompany', () => {
          const parentArgs = { id: 'id' };
          users.resolve(parentArgs);
          expect(getUsersFromCompany).toHaveBeenCalledWith(parentArgs.id);
        });
      });
    });
  });
});
