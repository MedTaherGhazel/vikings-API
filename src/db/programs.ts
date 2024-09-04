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
  sets: number;
  repetitions: number;
  imageUrl: string;
  videoUrl: string;
}

interface Nutrient {
  calorie: number;
  protein: number;
  fat: number;
  carb: number;
}

interface Meal {
  name: string;
  nutrient: Nutrient;
  desc: string;
  time: Date;
  imageUrl: string;
}

interface Workout {
  name: string;
  duration: string;
  time: Date;
  imageUrl: string;
  exercises: Exercise[];
}

interface Day {
  date: Date;
  meals: Meal[];
  workouts: Workout[];
}

interface Week {
  days: Day[];
}

interface Program extends Document {
  isMeal: boolean;
  name: string;
  desc: string;
  image: string;
  nbOfWeeks: number;
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
  sets: { type: Number, required: true },
  repetitions: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const NutrientSchema = new mongoose.Schema({
  calorie: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carb: { type: Number, required: true },
});

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nutrient: { type: NutrientSchema, required: true },
  desc: { type: String, required: true },
  time: { type: Date, required: true },
  imageUrl: { type: String, required: true },
});

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  time: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  exercises: [{ type: ExerciseSchema, required: true }],
});

const DaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meals: [{ type: MealSchema, required: true }],
  workouts: [{ type: WorkoutSchema, required: true }],
});

const WeekSchema = new mongoose.Schema({
  days: [{ type: DaySchema, required: true }],
});

const ProgramSchema = new mongoose.Schema({
  isMeal: { type: Boolean, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  nbOfWeeks: { type: Number, required: true },
  weeks: [{ type: WeekSchema, required: true }],
});

export const MuscleModel = mongoose.model('Muscle', MuscleSchema);
export const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
export const MealModel = mongoose.model('Meal', MealSchema);
export const WorkoutModel = mongoose.model('Workout', WorkoutSchema);
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

// CRUD methods for Meal
export const getMealById = (id: string) => MealModel.findById(id);
export const getAllMeals = () => MealModel.find();
export const createMeal = (values: Record<string, any>) => new MealModel(values).save().then((meal) => meal.toObject());
export const deleteMealById = (id: string) => MealModel.findOneAndDelete({ _id: id });
export const updateMealById = (id: string, values: Record<string, any>) => MealModel.findByIdAndUpdate(id, values);

// CRUD methods for Workout
export const getWorkoutById = (id: string) => WorkoutModel.findById(id);
export const getAllWorkouts = () => WorkoutModel.find();
export const createWorkout = (values: Record<string, any>) => new WorkoutModel(values).save().then((workout) => workout.toObject());
export const deleteWorkoutById = (id: string) => WorkoutModel.findOneAndDelete({ _id: id });
export const updateWorkoutById = (id: string, values: Record<string, any>) => WorkoutModel.findByIdAndUpdate(id, values);

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
