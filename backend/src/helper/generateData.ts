import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// create anonymous async function
(async () => {
  const users = [];
  // Kullanıcıları oluştur
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      },
    });
    users.push(user);
  }

  // Soruları ve yanıtları oluştur
  for (let i = 0; i < 50; i++) {
    // Soruyu oluştur
    const question = await prisma.question.create({
      data: {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        authorUuid: users[i % 100].uuid, // Kullanıcıları döngüde kullan
      },
    });

    // Soruya ilişkin yanıtları oluştur
    for (let j = 0; j < 3; j++) {
      await prisma.answer.create({
        data: {
          content: faker.lorem.paragraph(),
          authorUuid: users[(i + j) % 100].uuid, // Farklı kullanıcıları döngüde kullan
          questionUuid: question.uuid,
        },
      });

      await prisma.question.update({
        data: { answerCount: { increment: 1 } },
        where: { uuid: question.uuid },
      });
    }
  }
})();
