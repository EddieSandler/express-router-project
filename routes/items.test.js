process.env.NODE_ENV = "test";
const request = require("supertest");
const express = require("express");
const itemsRouter = require("../routes/items"); // Adjust the path as necessary
const ExpressError = require("../expressError"); // Ensure this path is correct
let items = require("../fakeDb");

const app = express();
app.use(express.json());
app.use("/items", itemsRouter);

beforeEach(() => {
  // Reset the items array to a known state before each test
  items.length = 0;
  items.push({ name: "bread", price: 2.50 });
});

afterEach(() => {
  // Clear the items array after each test
  items.length = 0;
});

describe("Items API", () => {
  test("GET /items returns all items", async () => {
    const response = await request(app).get("/items");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([{ name: "bread", price: 2.50 }]);
  });
})
  test("POST /items adds a new item", async () => {
    const newItem = { name: "milk", price: 1.99 };
    const response = await request(app).post("/items").send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newItem);
    // Verify the item was added
    expect(items).toContainEqual(newItem);
  });

  test("GET /items/:name returns item by name", async () => {
    const response = await request(app).get("/items/bread");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "bread", price: 2.50
  })
  })
  test("PATCH /items/:name updates an item", async () => {
    const updatedItem = { name: "bread", price: 3.00 };
    const response = await request(app).patch("/items/bread").send(updatedItem);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedItem);
  });

  test("DELETE /items/:name deletes an item", async () => {
    const response = await request(app).delete("/items/bread");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  })


// process.env.NODE_ENV = "test";

// const request = require("supertest");

// const app = require("../app");
// let items = require("../fakeDb");

// let groceries = { name: "eggs", price:3.19 };

// beforeEach(function() {
//   items.push(groceries);
// });

// afterEach(function() {
//   // make sure this *mutates*, not redefines, `cats`
//   items.length = 0;
// });

// describe("GET /items", function() {
//   test("Gets a list of grocery items", async function() {
//     const resp = await request(app).get(`/items`);
//     expect(resp.statusCode).toBe(200);

//     expect(resp.body).toEqual({items: [groceries]});
//   });
// });
// // end

// /** GET /cats/[name] - return data about one cat: `{cat: cat}` */

// describe("GET /items/:name", function() {
//   test("Gets a single grocery item", async function() {
//     const resp = await request(app).get(`/items/${groceries.name}`);
//     expect(resp.statusCode).toBe(200);

//     expect(resp.body).toBe({items: groceries});
//   });

//   test("Responds with 404 if can't find an item", async function() {
//     const resp = await request(app).get(`/items/${{items:groceries}}`);
//     expect(resp.statusCode).toBe(404);
//   });
// });
// // end



// describe("POST /items", function() {
//   test("Creates a new item", async function() {
//     const resp = await request(app)
//       .post(`/items`)
//       .send({
//         name: "milk",
//         price:1.59
//       });
//     expect(resp.statusCode).toBe(201);
//     expect(resp.body).toBe({
//       item: { name: "milk",
//               price:1.59 }
//     });
//   });
// });
// // end

// /** PATCH /cats/[name] - update cat; return `{cat: cat}` */

// describe("PATCH /cats/:name", function() {
//   test("Updates a single item", async function() {
//     const resp = await request(app)
//       .patch(`/items/${groceries.name}`)
//       .send({
//         name: "milk"
//       });
//     expect(resp.statusCode).toBe(200);
//     expect(resp.body).toEqual({
//       item: { name: "milk" }
//     });
//   });

//   test("Responds with 404 if id invalid", async function() {
//     const resp = await request(app).patch(`/items/:name`);
//     expect(resp.statusCode).toBe(404);
//   });
// });