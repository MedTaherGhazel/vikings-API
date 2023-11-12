import mongoose, { Schema, Document } from 'mongoose';

interface Muscle {
  name: string;
}

interface Exercise {
  name: string;
  muscles: {
    primary: Muscle[];
    secondary: Muscle[];
  };
  repetitions: number;
  videoUrl: string;
}

interface Day {
  exercises: Exercise[];
}

interface Week {
  days: Day[];
}

interface Program extends Document {
  name: string;
  desc: string;
  image: string;
  weeks: Week[];
}

const MuscleSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscles: {
    primary: [{ type: MuscleSchema }],
    secondary: [{ type: MuscleSchema }],
  },
  repetitions: { type: Number, required: true },
  videoUrl: { type: String, required: true },
});

const DaySchema = new mongoose.Schema({
  exercises: [{ type: ExerciseSchema }],
});

const WeekSchema = new mongoose.Schema({
  days: [{ type: DaySchema }],
});

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  weeks: [{ type: WeekSchema }],
});

export const MuscleModel = mongoose.model('Muscle', MuscleSchema);
export const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
export const DayModel = mongoose.model('Day', DaySchema);
export const WeekModel = mongoose.model('Week', WeekSchema);
export const ProgramModel = mongoose.model<Program>('Program', ProgramSchema);

// CRUD methods for Program
export const getPrograms = () => ProgramModel.find();
export const getProgramByName = (name: string) => ProgramModel.findOne({ name });
export const getProgramById = (id: string) => ProgramModel.findById(id);
export const createProgram = (values: Record<string, any>) => new ProgramModel(values).save().then((program) => program.toObject());
export const deleteProgramById = (id: string) => ProgramModel.findOneAndDelete({ _id: id });
export const updateProgramById = (id: string, values: Record<string, any>) => ProgramModel.findByIdAndUpdate(id, values);

// CRUD methods for Muscle
export const getMuscleById = (id: string) => MuscleModel.findById(id);
export const getAllMuscles = () => MuscleModel.find();
export const getMuscleByName = (name: string) => MuscleModel.findOne({ name });
export const createMuscle = (values: Record<string, any>) => new MuscleModel(values).save().then((muscle) => muscle.toObject());
export const deleteMuscleById = (id: string) => MuscleModel.findOneAndDelete({ _id: id });
export const updateMuscleById = (id: string, values: Record<string, any>) => MuscleModel.findByIdAndUpdate(id, values);

// CRUD methods for Exercise
export const getExerciseById = (id: string) => ExerciseModel.findById(id);
export const getAllExercises = () => ExerciseModel.find();
export const getExerciseByName = (name: string) => ExerciseModel.findOne({ name });
export const createExercise = (values: Record<string, any>) => new ExerciseModel(values).save().then((exercise) => exercise.toObject());
export const deleteExerciseById = (id: string) => ExerciseModel.findOneAndDelete({ _id: id });
export const updateExerciseById = (id: string, values: Record<string, any>) => ExerciseModel.findByIdAndUpdate(id, values);

// CRUD methods for Day
export const getAllDays = () => DayModel.find();
export const getDayById = (id: string) => DayModel.findById(id);
export const createDay = (values: Record<string, any>) => new DayModel(values).save().then((day) => day.toObject());
export const deleteDayById = (id: string) => DayModel.findOneAndDelete({ _id: id });
export const updateDayById = (id: string, values: Record<string, any>) => DayModel.findByIdAndUpdate(id, values);

// CRUD methods for Week
export const getAllWeeks = () => WeekModel.find();
export const getWeekById = (id: string) => WeekModel.findById(id);
export const createWeek = (values: Record<string, any>) => new WeekModel(values).save().then((week) => week.toObject());
export const deleteWeekById = (id: string) => WeekModel.findOneAndDelete({ _id: id });
export const updateWeekById = (id: string, values: Record<string, any>) => WeekModel.findByIdAndUpdate(id, values);
