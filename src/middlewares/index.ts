import  express  from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner =async (req:express.Request, res: express.Response, next:express.NextFunction) => {
    try{
        const { id } = req.params
        const currentUserId = get (req, 'identity._id') as string 

        if(!currentUserId){
            console.log('makch authenticated')
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id){
            console.log('makch enty')
            return res.sendStatus(403)
        }

        next();
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const isAuthenticated =async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['med'];

        if(!sessionToken){
            return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser) {
            return res.sendStatus(403)
        }

        merge(req, {identity: existingUser})

        next();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
} 

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUser = get(req, 'identity') as { isAdmin?: boolean };

        if (!currentUser || !currentUser.isAdmin) {
            console.log('User is not an admin');
            return res.sendStatus(403);
        }

        // If the user is an admin, proceed to the next middleware/route
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}



