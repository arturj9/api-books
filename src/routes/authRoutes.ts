import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { authController } from "../bootstrap";
import { Request, Response, Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", async (request: Request, response: Response) => {
  /* 
  #swagger.tags = ['Auth']
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginRequest"
                    }  
                }
            }
        } 
  #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/LoginResponse"
                    }
                }           
            }
        }   
  */
  const { status, body } = await authController.login(request);
  response.status(status).json(body);
});

authRoutes.post("/register", async (request: Request, response: Response) => {
  /*
  #swagger.tags = ['User']
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserRegister"
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
  const { status, body } = await authController.register(request);
  response.status(status).json(body);
});

authRoutes.get(
  "/info",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /* 
    #swagger.tags = ['User']
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/UserResponse"
                    }
                }           
            }
        }   
    */
    const { status, body } = await authController.info(request);
    response.status(status).json(body);
  }
);

authRoutes.patch(
  "/patch",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /* 
    #swagger.tags = ['User']
      #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/UserPatch"
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
    const { status, body } = await authController.patch(request);
    response.status(status).json(body);
  }
);

authRoutes.delete(
  "/delete",
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    /* 
    #swagger.tags = ['User']
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
    const { status, body } = await authController.delete(request);
    response.status(status).json(body);
  }
);

export { authRoutes };
