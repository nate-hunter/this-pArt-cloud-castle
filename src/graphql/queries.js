import { gql } from 'apollo-boost';


export const CHECK_IF_USERNAME_EXISTS = gql`
    query checkIfUsernameExists($username: String!) {
        users(where: {username: {_eq: $username } }) {
            username
        }
    }
`;

export const GET_USER_EMAIL = gql`
  query getUsernameEmail($username: String!) {
    users(where: {username: {_eq: $username}}) {
      email
    }
  }
`;
