import express from 'express';
import { getUserByEmail,createUser } from '../db/users';
import { authentication, random } from '../helpers/index';

export const login = async(req: express.Request,res:express.Response)=>{
  try{
    const{email,password} =req.body;

    if(!email || !password){
      return res.sendStatus(400);
    }

    const user =await getUserByEmail(email).select('authentication.salt +authentication.password');
    if(!user){
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password).toString();

    if (user.authentication.password !== expectedHash){
      return res.sendStatus(403);
    }

    const salt =random();
    user.authentication.sessionToken = authentication(salt, user._id.toString()).toString('hex');

     await user.save();

     res.cookie('med', user.authentication.sessionToken, {domain : 'localhost', path: '/'});
     
     return res.status(200).json(user).end();

  }catch(error){
    console.log(error);
    return res.sendStatus(400);
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      isAdmin: 0,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log("ahah",error);
    return res.sendStatus(400);
  }
}