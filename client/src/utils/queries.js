import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;


export const QUERY_ME_STATS = gql`
  {
    me {
      _id
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
          list
          episodes
          randomPont
          name
        }
      }
    }
  }
`;