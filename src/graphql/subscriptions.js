import { gql } from 'apollo-boost';


export const ME = gql`
  subscription me($userId: String) {
    users(where: {user_id: {_eq: $userId}}) {
      id
      user_id
      username
      name
      avatar
      last_checked
      bio
      website
    }
  }
`;