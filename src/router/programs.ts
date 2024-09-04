import express from 'express';
import {
    getAllPrograms,
    addMealProgram,
    addWorkoutProgram,
    getProgram,
    updateProgram,
    deleteProgram,
    getWeeks,
    addWeek,
    getWeek,
    updateWeek,
    deleteWeek,
    getDays,
    addDay,
    getDay,
    updateDay,
    deleteDay,
    getExercises,
    addExercise,
    getExercise,
    updateExercise,
    deleteExercise,
    getMuscles,
    addMuscle,
    getMuscle,
    updateMuscle,
    deleteMuscle,
    getMeals,
    getWorkouts,
} from '../controllers/programs';
import { isAdmin, isAuthenticated } from '../middlewares';

export default (router: express.Router) => {

    // Program routes
    router.get('/programs/get-all-meals', getMeals);
    router.get('/programs/get-all-workouts', getWorkouts);

    router.post('/programs/add-workout',isAuthenticated,isAdmin,addWorkoutProgram);
    router.post('/programs/add-meal',isAuthenticated,isAdmin,addMealProgram);

    router.get('/programs/:id', getProgram);
    router.put('/programs/:id', isAdmin, updateProgram);
    router.delete('/programs/:id', isAdmin, deleteProgram);

    // Week routes
    router.get('/weeks/get-all-weeks', getWeeks);
    router.post('/weeks/add-week', addWeek);
    router.get('/weeks/:id', getWeek);
    router.put('/weeks/:id', updateWeek);
    router.delete('/weeks/:id', deleteWeek);

    // Day routes
    router.get('/days/get-all-days', getDays);
    router.post('/days/add-day', addDay);
    router.get('/days/:id', getDay);
    router.put('/days/:id', updateDay);
    router.delete('/days/:id', deleteDay);

    // Exercise routes
    router.get('/exercises/get-all-exercises', getExercises);
    router.post('/exercises/add-exercise', addExercise);
    router.get('/exercises/:id', getExercise);
    router.put('/exercises/:id', updateExercise);
    router.delete('/exercises/:id', deleteExercise);

    // Muscle routes
    router.get('/muscles/get-all-muscles', getMuscles);
    router.post('/muscles/add-muscle', addMuscle);
    router.get('/muscles/:id', getMuscle);
    router.put('/muscles/:id', updateMuscle);
    router.delete('/muscles/:id', deleteMuscle);

}
