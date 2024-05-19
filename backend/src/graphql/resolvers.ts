import { Context } from "../context";
import { generateToken } from "../helper/jwt";

const resolvers = {
  NodeType: {
    __resolveType(obj: any) {
      if (obj.username) {
        return "User";
      }
      if (obj.title) {
        return "Question";
      }
      if (obj.content) {
        return "Answer";
      }
      throw new Error("Could not resolve type");
    },
  },
  Query: {
    async oneQuestion(_: any, { uuid }: { uuid: string }, { prisma }: Context) {
      try {
        if (!uuid) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const questionNode = await prisma.question.findUnique({
          where: {
            uuid,
          },
        });

        if (!questionNode) {
          return {
            node: null,
            status: false,
            message: "Question not found.",
          };
        }

        return {
          node: questionNode,
          status: true,
          message: "Question found successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async loginedUser(_: any, __: any, { prisma, loginedUser }: Context) {
      console.log(loginedUser);
      if (!loginedUser) {
        return null;
      }
      return await prisma.user.findUnique({
        where: {
          username: loginedUser.username,
        },
      });
    },
    async answers(
      _: any,
      {
        questionUuid,
        first = 10,
        after,
        before,
      }: { questionUuid: string; first: number; after: string; before: string },
      { prisma }: Context
    ) {
      const answers = await prisma.answer.findMany({
        where: {
          questionUuid,
        },
        take: first,
        skip: after ? 1 : before ? 1 : 0,
        cursor: after ? { uuid: after } : before ? { uuid: before } : undefined,
        orderBy: { uuid: after ? "asc" : "desc" },
      });

      const hasPreviousPage = before ? true : false;
      const hasNextPage = answers.length === first;

      const startCursor =
        answers.length > 0 ? answers[0].uuid.toString() : null;
      const endCursor =
        answers.length > 0 ? answers[answers.length - 1].uuid.toString() : null;

      return {
        edges: answers.map((answer) => ({
          cursor: answer.uuid.toString(),
          node: answer,
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      };
    },
    async allQuestions(
      _: any,
      {
        first = 10,
        after,
        before,
      }: { first: number; after: string; before: string },
      { prisma }: Context
    ) {
      const questions = await prisma.question.findMany({
        take: first,
        skip: after ? 1 : before ? 1 : 0,
        cursor: after ? { uuid: after } : before ? { uuid: before } : undefined,
        orderBy: { uuid: after ? "asc" : "desc" },
      });

      const hasPreviousPage = before ? true : false;
      const hasNextPage = questions.length === first;

      const startCursor =
        questions.length > 0 ? questions[0].uuid.toString() : null;
      const endCursor =
        questions.length > 0
          ? questions[questions.length - 1].uuid.toString()
          : null;

      return {
        edges: questions.map((question) => ({
          cursor: question.uuid.toString(),
          node: question,
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      };
    },
    async userQuestions(
      _: any,
      {
        first = 10,
        after,
        before,
      }: { first: number; after: string; before: string },
      { prisma, loginedUser }: Context
    ) {
      const questions = await prisma.question.findMany({
        where: {
          authorUuid: loginedUser.uuid,
        },
        take: first,
        skip: after ? 1 : before ? 1 : 0,
        cursor: after ? { uuid: after } : before ? { uuid: before } : undefined,
        orderBy: { uuid: after ? "asc" : "desc" },
      });

      const hasPreviousPage = before ? true : false;
      const hasNextPage = questions.length === first;

      const startCursor =
        questions.length > 0 ? questions[0].uuid.toString() : null;
      const endCursor =
        questions.length > 0
          ? questions[questions.length - 1].uuid.toString()
          : null;

      return {
        edges: questions.map((question) => ({
          cursor: question.uuid.toString(),
          node: question,
        })),
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        },
      };
    },
  },
  Mutation: {
    async createUser(
      _: any,
      {
        password,
        username,
        email,
      }: { password: string; username: string; email: string },
      context: Context
    ) {
      try {
        if (!username || !email || !password) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const userIsExist = await context.prisma.user.findMany({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (userIsExist.length > 0) {
          return {
            node: null,
            status: false,
            message: "User already exists.",
          };
        }

        const userNode = await context.prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });

        return {
          node: userNode,
          status: true,
          message: "User created successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async createQuestion(
      _: any,
      { title, content }: { title: string; content: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!title || !content) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const questionNode = await prisma.question.create({
          data: {
            title,
            content,
            author: {
              connect: {
                username: loginedUser.username,
              },
            },
          },
        });

        return {
          node: questionNode,
          status: true,
          message: "Question created successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async signIn(
      _: any,
      { username, password }: { username: string; password: string },
      { prisma }: Context
    ) {
      try {
        if (!username || !password) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const userIsExist = await prisma.user.findFirst({
          where: {
            username,
          },
        });

        if (!userIsExist) {
          return {
            node: null,
            status: false,
            message: "User not found.",
          };
        }

        if (userIsExist.password !== password) {
          return {
            node: null,
            status: false,
            message: "Invalid password.",
          };
        }

        return {
          node: userIsExist,
          status: true,
          message: generateToken({
            email: userIsExist.email,
            username: userIsExist.username,
            uuid: userIsExist.uuid,
          }),
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async createAnswer(
      _: any,
      { questionUuid, content }: { questionUuid: string; content: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!questionUuid || !content) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const questionNode = await prisma.question.findUnique({
          where: {
            uuid: questionUuid,
          },
        });

        if (!questionNode) {
          return {
            node: null,
            status: false,
            message: "Question not found.",
          };
        }

        const answerNode = await prisma.answer.create({
          data: {
            content,
            author: {
              connect: {
                username: loginedUser.username,
              },
            },
            question: {
              connect: {
                uuid: questionNode.uuid,
              },
            },
          },
        });

        return {
          node: answerNode,
          status: true,
          message: "Answer created successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async deleteQuestion(
      _: any,
      { uuid }: { uuid: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!uuid) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const questionNode = await prisma.question.findUnique({
          where: {
            uuid,
          },
        });

        if (!questionNode) {
          return {
            node: null,
            status: false,
            message: "Question not found.",
          };
        }

        if (questionNode.authorUuid !== loginedUser.uuid) {
          return {
            node: null,
            status: false,
            message: "You are not allowed to delete this question.",
          };
        }

        await prisma.question.delete({
          where: {
            uuid,
          },
        });

        return {
          node: questionNode,
          status: true,
          message: "Question deleted successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async deleteAnswer(
      _: any,
      { uuid }: { uuid: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!uuid) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const answerNode = await prisma.answer.findUnique({
          where: {
            uuid,
          },
        });

        if (!answerNode) {
          return {
            node: null,
            status: false,
            message: "Answer not found.",
          };
        }

        if (answerNode.authorUuid !== loginedUser.uuid) {
          return {
            node: null,
            status: false,
            message: "You are not allowed to delete this answer.",
          };
        }

        await prisma.answer.delete({
          where: {
            uuid,
          },
        });

        return {
          node: answerNode,
          status: true,
          message: "Answer deleted successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async deleteUser(_: any, { uuid }: { uuid: string }, { prisma }: Context) {
      try {
        if (!uuid) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const userNode = await prisma.user.findUnique({
          where: {
            uuid,
          },
        });

        if (!userNode) {
          return {
            node: null,
            status: false,
            message: "User not found.",
          };
        }

        await prisma.user.delete({
          where: {
            uuid,
          },
        });

        return {
          node: userNode,
          status: true,
          message: "User deleted successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async replyAnswer(
      _: any,
      { answerUuid, content }: { answerUuid: string; content: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!answerUuid || !content) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const answerNode = await prisma.answer.findUnique({
          where: {
            uuid: answerUuid,
          },
        });

        if (!answerNode) {
          return {
            node: null,
            status: false,
            message: "Answer not found.",
          };
        }

        const replyNode = await prisma.replyAnswer.create({
          data: {
            content,
            author: {
              connect: {
                username: loginedUser.username,
              },
            },
            answer: {
              connect: {
                uuid: answerNode.uuid,
              },
            },
          },
        });

        return {
          node: replyNode,
          status: true,
          message: "Reply created successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
    async deleteReplyAnswer(
      _: any,
      { uuid }: { uuid: string },
      { prisma, loginedUser }: Context
    ) {
      try {
        if (!uuid) {
          return {
            node: null,
            status: false,
            message: "Please provide all required fields.",
          };
        }

        const replyNode = await prisma.replyAnswer.findUnique({
          where: {
            uuid,
          },
        });

        if (!replyNode) {
          return {
            node: null,
            status: false,
            message: "Reply not found.",
          };
        }

        if (replyNode.authorUuid !== loginedUser.uuid) {
          return {
            node: null,
            status: false,
            message: "You are not allowed to delete this reply.",
          };
        }

        await prisma.replyAnswer.delete({
          where: {
            uuid,
          },
        });

        return {
          node: replyNode,
          status: true,
          message: "Reply deleted successfully!",
        };
      } catch (error) {
        return {
          node: null,
          status: false,
          message: `${error}`,
        };
      }
    },
  },
};

export default resolvers;
