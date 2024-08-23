import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Paper,
    IconButton,
    MenuItem,
} from '@mui/material';
import { useCreateRoutine } from '../hooks/useRoutines';
import { useExercises } from '../hooks/useExercises';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const CreateRoutineForm = () => {
    const [name, setName] = useState('');
    const [exercisesInRoutine, setExercisesInRoutine] = useState([
        { exerciseId: '', sets: '', reps: '', weight: '' },
    ]);
    const { mutate: createRoutine, isLoading } = useCreateRoutine();
    const { data: exercises, isLoading: isExercisesLoading } = useExercises();

    const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...exercisesInRoutine];
        updatedExercises[index][field] = value;
        setExercisesInRoutine(updatedExercises);
    };

    const addExerciseField = () => {
        setExercisesInRoutine([
            ...exercisesInRoutine,
            { exerciseId: '', sets: '', reps: '', weight: '' },
        ]);
    };

    const removeExerciseField = (index) => {
        const updatedExercises = exercisesInRoutine.filter((_, i) => i !== index);
        setExercisesInRoutine(updatedExercises);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedExercises = exercisesInRoutine.map((ex) => ({
            ...ex,
            sets: Number(ex.sets),
            reps: Number(ex.reps),
            weight: Number(ex.weight),
        }));
        createRoutine({ name, exercises: formattedExercises });
        setName('');
        setExercisesInRoutine([{ exerciseId: '', sets: '', reps: '', weight: '' }]);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Routine
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Routine Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Typography variant="h6" gutterBottom mt={2}>
                        Exercises
                    </Typography>
                    {exercisesInRoutine.map((exerciseField, index) => (
                        <Box
                            key={index}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            mt={2}
                        >
                            <TextField
                                select
                                label="Exercise"
                                value={exerciseField.exerciseId}
                                onChange={(e) =>
                                    handleExerciseChange(index, 'exerciseId', e.target.value)
                                }
                                fullWidth
                                required
                                disabled={isExercisesLoading}
                            >
                                {exercises &&
                                    exercises.map((exercise) => (
                                        <MenuItem key={exercise._id} value={exercise._id}>
                                            {exercise.name}
                                        </MenuItem>
                                    ))}
                            </TextField>
                            <TextField
                                label="Sets"
                                type="number"
                                value={exerciseField.sets}
                                onChange={(e) =>
                                    handleExerciseChange(index, 'sets', e.target.value)
                                }
                                required
                            />
                            <TextField
                                label="Reps"
                                type="number"
                                value={exerciseField.reps}
                                onChange={(e) =>
                                    handleExerciseChange(index, 'reps', e.target.value)
                                }
                                required
                            />
                            <TextField
                                label="Weight (kg)"
                                type="number"
                                value={exerciseField.weight}
                                onChange={(e) =>
                                    handleExerciseChange(index, 'weight', e.target.value)
                                }
                                required
                            />
                            <IconButton
                                color="error"
                                onClick={() => removeExerciseField(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={addExerciseField}
                        >
                            Add Exercise
                        </Button>
                    </Box>
                    <Box mt={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Routine'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateRoutineForm;
