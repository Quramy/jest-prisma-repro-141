import type { PrismaClient } from "@prisma/client";

export async function ensureUser(
  prisma: PrismaClient,
  data: {
    id: number;
    name: string;
  }
): Promise<boolean> {
  try {
    await prisma.user.create({ data });
    return true;
  } catch (err: any) {
    const uniqConstraintFailed = err.code === "P2002";

    if (uniqConstraintFailed) {
      return true;
    } else {
      console.error(err);
      return false;
    }
  }
}

test(ensureUser.name, async () => {
  const data = { id: 1, name: "foo" };

  // succeed
  expect(await ensureUser(jestPrisma.client, data)).toBe(true);

  try {
    await jestPrisma.client.$transaction(async () => {
      // succeed
      expect(await ensureUser(jestPrisma.client, data)).toBe(true);
      throw new Error();
    });
  } catch {}

  // succeed
  expect(await jestPrisma.client.user.count()).toBe(1);
});

test("count user", async () => {
  expect(await jestPrisma.client.user.count()).toBe(0);
});
