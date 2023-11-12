import express from 'express';
import { getProgramByName, createProgram, getProgramById, updateProgramById, deleteProgramById, getPrograms } from '../db/programs';
/**Week */
import {
    getAllWeeks,
    getWeekById,
    createWeek,
    deleteWeekById,
    updateWeekById,
} from '../db/programs';
/**Day */
import {
    getAllDays,
    getDayById,
    createDay,
    deleteDayById,
    updateDayById,
} from '../db/programs';
/**Exercise */
import {
    getExerciseById,
    getAllExercises,
    getExerciseByName,
    createExercise,
    deleteExerciseById,
    updateExerciseById,
} from '../db/programs';

/**Muscle */
import {
    getMuscleById,
    getAllMuscles,
    getMuscleByName,
    createMuscle,
    deleteMuscleById,
    updateMuscleById,
} from '../db/programs';
/****************************  P R O G R A M  ****************************/

export const getAllPrograms = async (req: express.Request, res: express.Response) => {
    try {
        const programs = await getPrograms();
        return res.status(200).json(programs);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // Internal Server Error
    }
}

export const addProgram = async (req: express.Request, res: express.Response) => {
    try {
        const { name, desc, image } = req.body;

        if (!name || !desc || !image) {
            console.log('Required fields missing');
            return res.sendStatus(400); // Bad Request
        }

        const existingProgram = await getProgramByName(name);

        if (existingProgram) {
            console.log('Program already exists');
            return res.sendStatus(409); // Conflict
        }

        const newProgram = await createProgram({ name, desc, image });
        return res.status(201).json(newProgram); // Created
    } catch (error) {
        console.log('Error adding program', error);
        return res.sendStatus(500);
    }
}

export const getProgram = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const program = await getProgramById(id);

        if (!program) {
            console.log('Program not found');
            return res.sendStatus(404); // Not Found
        }

        return res.status(200).json(program);
    } catch (error) {
        console.log('Error getting program', error);
        return res.sendStatus(500);
    }
}

export const updateProgram = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, desc, image } = req.body;

        const updatedProgram = await updateProgramById(id, { name, desc, image });

        if (!updatedProgram) {
            console.log('Program not found');
            return res.sendStatus(404); // Not Found
        }

        return res.status(200).json(updatedProgram);
    } catch (error) {
        console.log('Error updating program', error);
        return res.sendStatus(500);
    }
}

export const deleteProgram = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedProgram = await deleteProgramById(id);

        if (!deletedProgram) {
            console.log('Program not found');
            return res.sendStatus(404); // Not Found
        }

        return res.status(204).end(); // No Content
    } catch (error) {
        console.log('Error deleting program', error);
        return res.sendStatus(500);
    }
}
/****************************W e e K****************************/

export const getWeeks = async (req: express.Request, res: express.Response) => {
    try {
        const weeks = await getAllWeeks();
        return res.status(200).json(weeks);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addWeek = async (req: express.Request, res: express.Response) => {
    try {
        const { days } = req.body;

        if (!days || !Array.isArray(days)) {
            console.log('Invalid or missing days array');
            return res.sendStatus(400);
        }

        const newWeek = await createWeek({ days });
        return res.status(201).json(newWeek);
    } catch (error) {
        console.log('Error adding week', error);
        return res.sendStatus(500);
    }
}

export const getWeek = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const week = await getWeekById(id);

        if (!week) {
            console.log('Week not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(week);
    } catch (error) {
        console.log('Error getting week', error);
        return res.sendStatus(500);
    }
}

export const updateWeek = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { days } = req.body;

        const updatedWeek = await updateWeekById(id, { days });

        if (!updatedWeek) {
            console.log('Week not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedWeek);
    } catch (error) {
        console.log('Error updating week', error);
        return res.sendStatus(500);
    }
}

export const deleteWeek = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedWeek = await deleteWeekById(id);

        if (!deletedWeek) {
            console.log('Week not found');
            return res.sendStatus(404);
        }

        return res.status(204).end();
    } catch (error) {
        console.log('Error deleting week', error);
        return res.sendStatus(500);
    }
}

/****************************D A Y****************************/

export const getDays = async (req: express.Request, res: express.Response) => {
    try {
        const days = await getAllDays();
        return res.status(200).json(days);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addDay = async (req: express.Request, res: express.Response) => {
    try {
        const { exercises } = req.body;

        if (!exercises || !Array.isArray(exercises)) {
            console.log('Invalid or missing exercises array');
            return res.sendStatus(400);
        }

        const newDay = await createDay({ exercises });
        return res.status(201).json(newDay);
    } catch (error) {
        console.log('Error adding day', error);
        return res.sendStatus(500);
    }
}

export const getDay = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const day = await getDayById(id);

        if (!day) {
            console.log('Day not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(day);
    } catch (error) {
        console.log('Error getting day', error);
        return res.sendStatus(500);
    }
}

export const updateDay = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { exercises } = req.body;

        const updatedDay = await updateDayById(id, { exercises });

        if (!updatedDay) {
            console.log('Day not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedDay);
    } catch (error) {
        console.log('Error updating day', error);
        return res.sendStatus(500);
    }
}

export const deleteDay = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedDay = await deleteDayById(id);

        if (!deletedDay) {
            console.log('Day not found');
            return res.sendStatus(404);
        }

        return res.status(204).end();
    } catch (error) {
        console.log('Error deleting day', error);
        return res.sendStatus(500);
    }
}

/****************************E X E R C I S E****************************/

export const getExercises = async (req: express.Request, res: express.Response) => {
    try {
        const exercises = await getAllExercises();
        return res.status(200).json(exercises);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { name, muscles, repetitions, videoUrl } = req.body;

        if (!name || !muscles || !repetitions || !videoUrl) {
            console.log('Required fields missing');
            return res.sendStatus(400);
        }

        const existingExercise = await getExerciseByName(name);

        if (existingExercise) {
            console.log('Exercise already exists');
            return res.sendStatus(409);
        }

        const newExercise = await createExercise({ name, muscles, repetitions, videoUrl });
        return res.status(201).json(newExercise);
    } catch (error) {
        console.log('Error adding exercise', error);
        return res.sendStatus(500);
    }
}

export const getExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const exercise = await getExerciseById(id);

        if (!exercise) {
            console.log('Exercise not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(exercise);
    } catch (error) {
        console.log('Error getting exercise', error);
        return res.sendStatus(500);
    }
}

export const updateExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, muscles, repetitions, videoUrl } = req.body;

        const updatedExercise = await updateExerciseById(id, { name, muscles, repetitions, videoUrl });

        if (!updatedExercise) {
            console.log('Exercise not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedExercise);
    } catch (error) {
        console.log('Error updating exercise', error);
        return res.sendStatus(500);
    }
}

export const deleteExercise = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedExercise = await deleteExerciseById(id);

        if (!deletedExercise) {
            console.log('Exercise not found');
            return res.sendStatus(404);
        }

        return res.status(204).end();
    } catch (error) {
        console.log('Error deleting exercise', error);
        return res.sendStatus(500);
    }
}

/**************************** M U S C L E ****************************/
export const getMuscles = async (req: express.Request, res: express.Response) => {
    try {
        const muscles = await getAllMuscles();
        return res.status(200).json(muscles);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addMuscle = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            console.log('Required fields missing');
            return res.sendStatus(400);
        }

        const existingMuscle = await getMuscleByName(name);

        if (existingMuscle) {
            console.log('Muscle already exists');
            return res.sendStatus(409);
        }

        const newMuscle = await createMuscle({ name });
        return res.status(201).json(newMuscle);
    } catch (error) {
        console.log('Error adding muscle', error);
        return res.sendStatus(500);
    }
}

export const getMuscle = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const muscle = await getMuscleById(id);

        if (!muscle) {
            console.log('Muscle not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(muscle);
    } catch (error) {
        console.log('Error getting muscle', error);
        return res.sendStatus(500);
    }
}

export const updateMuscle = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedMuscle = await updateMuscleById(id, { name });

        if (!updatedMuscle) {
            console.log('Muscle not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedMuscle);
    } catch (error) {
        console.log('Error updating muscle', error);
        return res.sendStatus(500);
    }
}

export const deleteMuscle = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedMuscle = await deleteMuscleById(id);

        if (!deletedMuscle) {
            console.log('Muscle not found');
            return res.sendStatus(404);
        }

        return res.status(204).end();
    } catch (error) {
        console.log('Error deleting muscle', error);
        return res.sendStatus(500);
    }
}
