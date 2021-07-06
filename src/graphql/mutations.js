import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
    mutation createUsers($userId: String!, $name: String!, $username: String!, $email: String!, $bio: String!, $website: String!, $avatar: String!) {
        insert_users(objects: {user_id: $userId, name: $name, username: $username, email: $email, bio: $bio, website: $website, avatar: $avatar}) {
            affected_rows
        }
    }
`;
