import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, lifecycle, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/current-user';

const requiredAuth = Component => props => <Component {...props} />;
const noop = isLoading => branch(isLoading, renderNothing);

export default compose(
  graphql(currentUserQuery),
  withRouter,
  lifecycle({
    componentWillUpdate(nextProps) {
      const { onStatusUpdated, redirectPath = '/', history } = this.props;
      const { data } = nextProps;
      if (onStatusUpdated) {
        onStatusUpdated(!!data.user);
      }
      if (!data.loading && !data.user) {
        history.push(redirectPath);
      }
    },
  }),
  noop(({ data }) => data && data.loading),
  requiredAuth,
);
