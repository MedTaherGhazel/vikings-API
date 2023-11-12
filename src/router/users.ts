import { deleteUser, getAllUsers, updateUser } from '../controllers/users'
import express from "express"
import { isAdmin, isAuthenticated, isOwner } from '../middlewares'


export default (router: express.Router)=>{
    router.get('/users',isAuthenticated,isAdmin, getAllUsers)
    router.delete('/user/:id',isAuthenticated, isOwner, deleteUser)
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser)
}
