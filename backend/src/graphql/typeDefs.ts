const typeDefs = `#graphql

    # Query type for fetching data.
    type Query {
        allQuestions(first: Int after: String before: String): QuestionConnection!
        answers(questionUuid: ID! first: Int, after: String before: String): AnswerConnection!
        loginedUser: User!
        userQuestions(first: Int after: String before: String): QuestionConnection!
        oneQuestion(uuid: ID!): ReturnQuestion!
    }

    type Mutation {
        createQuestion(title: String!, content: String!): ReturnType!
        createAnswer(questionUuid: ID!, content: String!): ReturnType!
        replyAnswer(answerUuid: ID!, content: String!): ReturnType!
        createUser(password: String!, username: String!, email: String!): ReturnType!
        signIn(username: String!, password: String!): ReturnType!
        deleteQuestion(uuid: ID!): ReturnType!
        deleteAnswer(uuid: ID!): ReturnType!
        deleteReplyAnswer(uuid: ID!): ReturnType!
        deleteUser(uuid: ID!): ReturnType!
    }

    type ReturnQuestion {
        node: Question!
        status: Boolean!
        message: String!
    }

    union NodeType = Question | User | Answer

    type ReturnType {
        node: NodeType
        status: Boolean!
        message: String!
    }

    type AnswerConnection {
        edges: [AnswerEdge!]!
        pageInfo: PageInfo!
    }

    type AnswerEdge {
        cursor: String!
        node: Answer!
    }

    type QuestionConnection {
        edges: [QuestionEdge!]!
        pageInfo: PageInfo!
    }

    type QuestionEdge {
        cursor: String!
        node: Question!
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }

    type User {
        uuid: ID!
        username: String!
        email: String!
    }

    type Question {
        uuid: ID!
        title: String!
        content: String!
        answerCount: Int!
    }

    type Answer {
        uuid: ID!
        content: String!
    }
`;

export default typeDefs;
