import { Router } from "express";
import { bookController } from "../bootstrap";
import { Request, Response } from "express";
import { ensureAuthenticate } from "middlewares/ensureAuthenticate";

const bookRoutes = Router();

// register
bookRoutes.post(
  "/register",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /*
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/BookRegister"
                    }  
                }
            }
        } 
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.responses[201] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/DefaultResponse"
                    }
                }           
            }
        }   
     */
    const { status, body } = await bookController.register(request);
    response.status(status).json(body);
  }
);

// list
bookRoutes.get("/list/", async (request: Request, response: Response) => {
  /*
  #swagger.parameters['$ref'] = ['#/components/parameters/PageQuery', '#/components/parameters/PageSizeQuery', '#/components/parameters/SearchQuery',  '#/components/parameters/CategoryQuery'] 
  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/BookResponse"
                    }
                }           
            }
        }   
  */
  const { status, body } = await bookController.list(request);
  response.status(status).json(body);
});

// list
bookRoutes.get(
  "/listByUser/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /*
    #swagger.parameters['$ref'] = ['#/components/parameters/PageQuery', '#/components/parameters/PageSizeQuery', '#/components/parameters/SearchQuery',  '#/components/parameters/CategoryQuery'] 
    #swagger.responses[200] = {
              content: {
                  "application/json": {
                      schema:{
                          $ref: "#/components/schemas/BookResponse"
                      }
                  }           
              }
          }  
    #swagger.security = [{
            "bearerAuth": []
    }]
    */
    const { status, body } = await bookController.listByUser(request);
    response.status(status).json(body);
  }
);

// patch
bookRoutes.patch(
  "/patch/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /*
    #swagger.parameters['$ref'] = [ '#/components/parameters/IdBookQuery'] 
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/BookPatch"
                    }  
                }
            }
        } 
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.responses[201] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/DefaultResponse"
                    }
                }           
            }
        }   
     */
    const { status, body } = await bookController.patch(request);
    response.status(status).json(body);
  }
);

// delete
bookRoutes.delete(
  "/delete/",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /*
    #swagger.parameters['$ref'] = [ '#/components/parameters/IdBookQuery'] 
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.responses[204] = {
            content: {
                "application/json": {
                }           
            }
        }   
     */
    const { status, body } = await bookController.delete(request);
    response.status(status).json(body);
  }
);

// list books categories
bookRoutes.get("/categories/", async (request: Request, response: Response) => {
  /*
    #swagger.parameters['$ref'] = [ '#/components/parameters/SearchQuery'] 
    #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/BookCategoryResponse"
                    }
                }           
            }
        }   
     */
  const { status, body } = await bookController.listBooksCategories(request);
  response.status(status).json(body);
});

export { bookRoutes };
