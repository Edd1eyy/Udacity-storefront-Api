import { UserStore } from "../user";
const store = new UserStore();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.delete).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create method should add a book", async () => {
    const username = "man";
    const password = "woman";
    const result = await store.create(username, password);

    expect(result).toEqual({
      id: 1,
      username: "man",
      password: "woman",
    });
  });

  it("index method should return a list of books", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        username: "man",
        password: "woman",
      },
    ]);
  });

  it("show method should return the correct book", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      username: "man",
      password: "woman",
    });
  });

  it("delete method should remove the book", async () => {
    store.delete("1");
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
