// useExercisesImages.js
import benchPress from '../Images/Exercises/bench_press.png'
import bicepCurl from '../Images/Exercises/Bicep_Curl.png'
import crunches from '../Images/Exercises/Crunches.png'
import deadlift from '../Images/Exercises/Deadlift.png'
import hammerCurl from '../Images/Exercises/Hammer_Curl.png'
import jumpRope from '../Images/Exercises/Jump_Rope.png'
import lateralRaise from '../Images/Exercises/Lateral_Raise.png'
import lunges from '../Images/Exercises/Lunges.png'
import plank from '../Images/Exercises/Plank.png'
import pullUps from '../Images/Exercises/pull-ups.png'
import pushups from '../Images/Exercises/Pushups.png'
import running from '../Images/Exercises/Running.png'
import shoulderPress from '../Images/Exercises/Shoulder_press.png'
import squats from '../Images/Exercises/Squats.png'
import tricepDips from '../Images/Exercises/tricep_dips.png'
import tricepPushdown from '../Images/Exercises/tricep_pushdown.png'

export const ExerciseType = {
  BENCH_PRESS: 'Bench Press',
  BICEP_CURL: 'Bicep Curl',
  CRUNCHES: 'Crunches',
  DEADLIFT: 'Deadlift',
  HAMMER_CURL: 'Hammer Curl',
  JUMP_ROPE: 'Jump Rope',
  LATERAL_RAISE: 'Lateral Raise',
  LUNGES: 'Lunges',
  PLANK: 'Plank',
  PULL_UPS: 'Pull-ups',
  PUSH_UPS: 'Push-ups',
  RUNNING: 'Running',
  SHOULDER_PRESS: 'Shoulder Press',
  SQUATS: 'Squats',
  TRICEP_DIPS: 'Tricep Dips',
  TRICEP_PUSHDOWN: 'Tricep Pushdown',
}

const exerciseImages = {
  [ExerciseType.BENCH_PRESS]: benchPress,
  [ExerciseType.BICEP_CURL]: bicepCurl,
  [ExerciseType.CRUNCHES]: crunches,
  [ExerciseType.DEADLIFT]: deadlift,
  [ExerciseType.HAMMER_CURL]: hammerCurl,
  [ExerciseType.JUMP_ROPE]: jumpRope,
  [ExerciseType.LATERAL_RAISE]: lateralRaise,
  [ExerciseType.LUNGES]: lunges,
  [ExerciseType.PLANK]: plank,
  [ExerciseType.PULL_UPS]: pullUps,
  [ExerciseType.PUSH_UPS]: pushups,
  [ExerciseType.RUNNING]: running,
  [ExerciseType.SHOULDER_PRESS]: shoulderPress,
  [ExerciseType.SQUATS]: squats,
  [ExerciseType.TRICEP_DIPS]: tricepDips,
  [ExerciseType.TRICEP_PUSHDOWN]: tricepPushdown,
}

export const useExercisesImages = () => {
  const getExerciseImage = exerciseNameOrType => {
    // Check if the input is a valid ExerciseType
    if (Object.values(ExerciseType).includes(exerciseNameOrType)) {
      return exerciseImages[exerciseNameOrType]
    }
    // If not, try to find a matching exercise name
    const matchingType = Object.values(ExerciseType).find(type => type.toLowerCase() === exerciseNameOrType.toLowerCase())
    return matchingType ? exerciseImages[matchingType] : null
  }

  return { getExerciseImage }
}
