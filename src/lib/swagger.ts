import swaggerAutogen from "swagger-autogen";
import { boolean } from "zod";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Library",
    description: "Bibioteca simples.",
  },
  servers: [
    {
      url: 'https://api-books.fly.dev/',             
      description: 'Produção'     
    },
    {
      url: 'http://localhost:8080/',            
      description: 'Local'      
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "",
    },
    {
      name: "User",
      description: "",
    },
    {
      name: "Book",
      description: "",
    },
    {
      name: "Booking",
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      DefaultResponse:{
        message: "message"
      },
      BooleanResponse:{
        $tokenIsValid: "boolean"
      },
      LoginRequest: {
        $email: "email@email.com",
        $password: "password",
      },
      LoginResponse:{
        $token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcyMTgyOTgsImV4cCI6MTcwNzMwNDY5OCwic3ViIjoiZmQ3MmIyMzMtMzJmNi00Y2ZiLWE1ZmEtMTk0NDY3MmJiM2E0In0.JPQGJRaXsZG4UakiXbT2AZyxKmk9JhWtmFBxzZxRdTY"
      },
      TokenRequest:{
        $token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDcyMTgyOTgsImV4cCI6MTcwNzMwNDY5OCwic3ViIjoiZmQ3MmIyMzMtMzJmNi00Y2ZiLWE1ZmEtMTk0NDY3MmJiM2E0In0.JPQGJRaXsZG4UakiXbT2AZyxKmk9JhWtmFBxzZxRdTY"
      },
      UserRegister: {
        $username: "username",
        $name: "name",
        $email: "email@email.com",
        $password: "password",
      },
      UserPatch: {
        username: "username",
        name: "name",
        email: "email@email.com",
        password: "password",
      },
      UserResponse:{
        $id: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $username: "username",
        $name: "name",
        $email: "email@email.com",
        $createdAt: "year-mouth-day",
        $updatedAt: "year-mouth-day"
      },
      BookRegister: {
        $title: "title",
        $cod: "cod",
        $editora: "editora",
        $autor: "autor",
        $sinopse: "sinopse",
        $bookCategoryId: "729c1ed8-93bf-4e1a-9d48-d4dec11e57e7",
        $qtd: 1,
      },
      BookPatch: {
        title: "title",
        cod: "cod",
        editora: "editora",
        autor: "autor",
        sinopse: "sinopse",
        bookCategoryId: "729c1ed8-93bf-4e1a-9d48-d4dec11e57e7",
        qtd: 1,
      },
      BookResponse:[{
        $id: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $title: "title",
        $cod: "cod",
        $editora: "editora",
        $autor: "autor",
        $sinopse: "sinopse",
        $bookCategoryId: "729c1ed8-93bf-4e1a-9d48-d4dec11e57e7",
        $qtd: 1,
        $idUser: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $createdAt: "year-mouth-day",
        $updatedAt: "year-mouth-day"
      },],
      BookCategoryResponse:[{
        $id: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $name: "name",
        $createdAt: "year-mouth-day",
        $updatedAt: "year-mouth-day"
      },],
      BookingRegister: {
        $bookId: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
      },
      BookingResponse:[{
        $id: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $idUser: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $bookId: "a0fbbdeb-fee6-4e58-bec7-8ef84e55a892",
        $createdAt: "year-mouth-day",
        $updatedAt: "year-mouth-day"
      },],
    },
    parameters: {
      IdBookQuery:{
        name: "id",
        in: "query",
        schema: {
          type: "string",
        },
      },
      Token: {
        name: "token",
        in: "query",
        schema: {
          type: "string",
        },
      },
      PageQuery: {
        name: "page",
        in: "query",
        schema: {
          type: "integer",
        },
      },
      PageSizeQuery: {
        name: "pageSize",
        in: "query",
        schema: {
          type: "integer",
        },
      },
      SearchQuery: {
        name: "search",
        in: "query",
        schema: {
          type: "string",
        },
      },
      CategoryQuery: {
        name: "categoryId",
        in: "query",
        schema: {
          type: "string",
        },
      },
    },
  },
};

const options = {
  openapi: "3.0.0",
  language: "pt-BR",
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../app.ts"];

swaggerAutogen(options)(outputFile, endpointsFiles, doc);
