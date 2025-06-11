import sequelize from "../../../config/database";
import { User } from "../../user.model";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User model", () => {
  it("should create a user successfully", async () => {
    const user = await User.create({
      full_name: "Test User",
      email: "test@example.com",
      password_hash: "jd12345@",
      role: "customer",
      provider: "local",
    });

    expect(user).toBeDefined();
    expect(user.id).toBeGreaterThan(0);
    expect(user.email).toBe("test@example.com");
    expect(user.role).toBe("customer");
  });

  it("should not allow duplicate emails", async () => {
    await expect(
      User.create({
        full_name: "Another User",
        email: "test@example.com",
        password_hash: "abc123",
        role: "customer",
        provider: "local",
      })
    ).rejects.toThrow();
  });
});
