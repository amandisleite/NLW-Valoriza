import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

   // receber o token (via headers de http)
   const authToken = request.headers.authorization

   // validar se o token está preenchido (pode não estar preenchido)
   if(!authToken) {
       return response.status(401).end(); // pega a mensagem padrão do erro 401
   }

   const [,token] = authToken.split(" ") // dividir a string do token (que vem o bearer), pelo espaço - só pega o token
   
   // validar se o token é válido (não expirado, por exemplo)
   
   try {
    const { sub } = verify(token, "6425ddbf9cd648e1e4d33c4340d3373d") as IPayload;

    // recuperar informações do usuário (pra manter a sessão)
    request.user_id = sub;

    return next();
   } catch(err) {
       return response.status(401).end();
   }
   
}