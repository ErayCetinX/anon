import {gql} from '@apollo/client';

export const allQuestions = gql`
  query allQuestion($first: Int, $after: String, $before: String) {
    allQuestions(first: $first, after: $after, before: $before) {
      edges {
        cursor
        node {
          uuid
          title
          content
          answerCount
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const oneQuestion = gql`
  query oneQuestion($uuid: ID!) {
    oneQuestion(uuid: $uuid) {
      node {
        uuid
        title
        content
        answerCount
      }
      status
      message
    }
  }
`;
