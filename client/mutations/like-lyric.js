import gql from 'graphql-tag';

const likeLyric = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default likeLyric;
