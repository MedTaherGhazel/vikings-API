import  express  from 'express';

import { addProgram, getAllPrograms } from '../controllers/programs';
import { isAdmin } from '../middlewares';

export default (router :express.Router)=>{
    router.get('/programs/get-all-programs', getAllPrograms);
    router.post('/programs/add-program',isAdmin, addProgram);
}
