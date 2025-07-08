import { generateRandomNumber, generateRandomString } from "../support/faker";

describe("Products", () => {
  let totalProducts: number;

  it("fetch all products", () => {
    cy.request("GET", "/products").then((response) => {
      const { status, body } = response;

      expect(status).to.eq(200);
      for (let product of body.products) {
        expect(product.id, "Id should be a number").to.be.a("number");
        expect(product.title, "Title should be a string").to.be.a("string");
        expect(product.description, "Description should be a string").to.be.a(
          "string"
        );
        expect(product.category, "Category should be a string").to.be.a(
          "string"
        );
        expect(product.price, "Price should be a number").to.be.a("number");
        expect(
          product.discountPercentage,
          "Discount percentage should be a number"
        ).to.be.a("number");
        expect(product.rating, "Rating should be a number").to.be.a("number");
        expect(product.stock, "Stock should be a number").to.be.a("number");
        // Additional assertions can be added...
      }

      totalProducts = body.total;
    });
  });

  it("fetch single product", () => {
    const randomProductID = generateRandomNumber(1, totalProducts);

    cy.request("GET", `/products/${randomProductID}`).then((response) => {
      const { status, body } = response;

      expect(status).to.eq(200);
      expect(body.id, "Id should be a number").to.eq(randomProductID);
      expect(body.title, "Title should be a string").to.be.a("string");
      expect(body.description, "Description should be a string").to.be.a(
        "string"
      );
      expect(body.category, "Category should be a string").to.be.a("string");
      expect(body.price, "Price should be a number").to.be.a("number");
      expect(
        body.discountPercentage,
        "Discount percentage should be a number"
      ).to.be.a("number");
      expect(body.rating, "Rating should be a number").to.be.a("number");
      expect(body.stock, "Stock should be a number").to.be.a("number");
      // Additional assertions can be added...
    });
  });

  it("[Negative] Fetch single product", () => {
    const randomProductID = generateRandomNumber(100000, 10000000);

    cy.request("GET", `/products/${randomProductID}`).then((response) => {
      console.log(response)
      const { status, body } = response;

      expect(status).to.eq(404)
      expect(body.message).to.eq(`Product with id ${randomProductID} not found`)
    });
  });

  it("add product", () => {
    const randomStringTitle = generateRandomString();
    const randomStringCategory = generateRandomString();
    const randomNumberPrice = generateRandomNumber();

    cy.request("POST", "/products/add", {
      title: randomStringTitle,
      category: randomStringCategory,
      price: randomNumberPrice,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.eq(201);
      expect(
        body.id,
        "Id should equal the value of totalProducts variable plus 1"
      ).to.eq(totalProducts + 1);
      expect(
        body.title,
        "Title should equal the value of randomStringTitle constant"
      ).to.eq(randomStringTitle);
      expect(
        body.category,
        "Category should equal the value of randomStringCategory constant"
      ).to.eq(randomStringCategory);
      expect(
        body.price,
        "Price should equal the value of randomNumberPrice constant"
      ).to.eq(randomNumberPrice);
      // Additional assertions can be added depending on the amount of request body properties
    });
  });

  it("update product", () => {
    const randomProductID = generateRandomNumber(1, totalProducts);
    const randomStringTitle = generateRandomString();
    const randomStringCategory = generateRandomString();
    const randomNumberPrice = generateRandomNumber();

    cy.request("PUT", `/products/${randomProductID}`, {
      title: randomStringTitle,
      category: randomStringCategory,
      price: randomNumberPrice,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.eq(200);
      expect(
        body.id,
        "Id should equal the value of randomProductID constant"
      ).to.eq(randomProductID);
      expect(
        body.title,
        "Title should equal the value of randomStringTitle constant"
      ).to.eq(randomStringTitle);
      expect(
        body.category,
        "Category should equal the value of randomStringCategory constant"
      ).to.eq(randomStringCategory);
      expect(
        body.price,
        "Price should equal the value of randomNumberPrice constant"
      ).to.eq(randomNumberPrice);
      // Additional assertions can be added depending on the amount of request body properties
    });
  });

  it("delete product", () => {
    const randomProductID = generateRandomNumber(1, totalProducts);

    cy.request("DELETE", `/products/${randomProductID}`).then((response) => {
      const { status, body } = response;

      expect(status).to.eq(200);
      expect(
        body.id,
        "Id should equal the value of randomProductID constant"
      ).to.eq(randomProductID);
      expect(body.title, "Title should be a string").to.be.a("string");
      expect(body.description, "Description should be a string").to.be.a(
        "string"
      );
      expect(body.category, "Category should be a string").to.be.a("string");
      expect(body.price, "Price should be a number").to.be.a("number");
      expect(
        body.discountPercentage,
        "Discount percentage should be a number"
      ).to.be.a("number");
      expect(body.rating, "Rating should be a number").to.be.a("number");
      expect(body.stock, "Stock should be a number").to.be.a("number");
      expect(body.isDeleted, "IsDeleted should equal true").to.eq(true);
      expect(body.deletedOn, "DeletedOn should be a string").to.be.a("string");
      // Additional assertions can be added...
    });
  });
});
