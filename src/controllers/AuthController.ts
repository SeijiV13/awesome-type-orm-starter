import { Users } from './../entity/User';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import config from '../config/config';

export default class AuthController { 
  public static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const userRepository = getRepository(Users);
        if (!(username && password)) {
          res.status(400).send();
        }
    
        let user: Users;
        // Check if user exists
        user = await userRepository.findOne({ where: { username  } });
        if (!user) {
            res.status(404).send({message: "Incorrect user or password"});
            return;  
        }
        // Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
          res.status(404).send({message: "Incorrect user or password"});
          return;
        }

        AuthController.signJwt(user, res);
      };

      
  public static signJwt(user: Users, res) {
    // Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
    let firstTimeLoggedIn = false;
    try {
        // Send the jwt in the response
          res.send({
            jwt: token,
          });
      
    } catch (error) {
      res.status(401).send();
    }
  }
}