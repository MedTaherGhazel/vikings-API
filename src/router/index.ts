import express from 'express';
import authentication from './authentication';
import programs from './programs'
import users from './users'

const router= express.Router();

export default(): express.Router =>{
    authentication(router);
    programs(router);  
    users(router);
    return router ;
} ;