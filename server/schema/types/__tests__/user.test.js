import { GraphQLString, GraphQLInt } from 'graphql';
import { createUserType, UserType } from '../user';
import { CompanyType } from '../../types/company';

describe('Company', () => {
  it('is set the correct name', () => {
    expect(UserType.name).toBe('User');
  });

  describe('fields', () => {
    describe('id', () => {
      it('has the correct type', () => {
        const { id } = UserType.getFields();
        expect(id.type).toEqual(GraphQLString);
      });
    });
    describe('firstName', () => {
      it('has the correct type', () => {
        const { firstName } = UserType.getFields();
        expect(firstName.type).toEqual(GraphQLString);
      });
    });
    describe('age', () => {
      it('has the correct type', () => {
        const { age } = UserType.getFields();
        expect(age.type).toEqual(GraphQLInt);
      });
    });
    describe('company', () => {
      const getCompany = jest.fn();
      const c = createUserType(getCompany);
      const { company } = c.getFields();
      it('has the correct type', () => {
        expect(company.type).toEqual(CompanyType);
      });

      describe('resolve', () => {
        it('calls getCompany', () => {
          const parentArgs = { companyId: 'companyId' };
          company.resolve(parentArgs);
          expect(getCompany).toHaveBeenCalledWith(parentArgs.companyId);
        });
      });
    });
  });
});
