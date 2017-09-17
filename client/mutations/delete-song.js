import gql from 'graphql-tag';

const deleteSong = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      title
    }
  }
`;

export default deleteSong;
