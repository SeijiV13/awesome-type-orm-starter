import { Request, Response } from 'express';
import { Users } from '../entity/User';
import { getRepository } from 'typeorm';
export default class UserController {
        
    public static createUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const newUser = new Users();
        const repository = getRepository(Users);
      
        newUser.passwordHash = password;
        newUser.username = username;


        //hashpassword
        newUser.hashPassword();

        // check if username or email exist alreay 
        const user = await repository.findOne({where: {username}});
            if(user) {

                res.status(400).send({message: "username is already taken"})
            } else {
            
                const response = await repository.save(newUser);

                res.status(200).send(response);               
            }

    }

}