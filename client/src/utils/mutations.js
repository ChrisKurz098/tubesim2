import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        stats {
          lastCh
          currentCh
          volume
          horShift
          vertShift
          horSize
          vertSize
          watched
          channels {
            name
            list
            episodes
            randomPoint
          }
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        stats {
          lastCh
          currentCh
          volume
          horShift
          vertShift
          horSize
          vertSize
          watched
          channels {
            name
            list
            episodes
            randomPoint
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_STATS = gql`
mutation UpdateUserStats($localStats : String!) {
  updateUserStats(localStats: $localStats) {
    _id
  }
}
`;