import gql from 'graphql-tag';

const deleteSong = gql`
  mutation deleteLyric($id: ID) {
    deleteLyric(id: $id) {
      id
    }
  }
`;

export default deleteSong;
