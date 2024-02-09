import { Router } from "express";
import { bookingController } from "../bootstrap";
import { Request, Response } from "express";

const bookingRoutes = Router();

// register
bookingRoutes.post(
  "/register",
  async (request: Request, response: Response) => {
    /* 
      #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/BookingRegister"
                      }  
                  }
              }
          }
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
    const { status, body } = await bookingController.register(request);
    response.status(status).json(body);
  }
);

// list by user
bookingRoutes.get("/list", async (request: Request, response: Response) => {
  /* 
  #swagger.parameters['$ref'] = ['#/components/parameters/PageQuery', '#/components/parameters/PageSizeQuery', '#/components/parameters/SearchQuery'] 
  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/BookingResponse"
                    }
                }           
            }
        }   
  */
  const { status, body } = await bookingController.listByUser(request);
  response.status(status).json(body);
});

export { bookingRoutes };
