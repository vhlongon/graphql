import gql from 'graphql-tag';

const deleteSong = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      title
      id
    }
  }
`;

export default deleteSong;
