import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTrainingHistory } from '../hooks/useTrainingHistory'
import Sidebar from '../components/Sidebar'

const TrainingRecord = () => {
  const { data: trainingHistory, isLoading, error } = useTrainingHistory()

  console.log('Training History Data:', trainingHistory)

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">
          {
            // @ts-ignore
            error.message || 'Failed to load training history. Please try again later.'
          }
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#d2cfc9', minHeight: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, pt: 3 }}>
        <Typography variant="h4" marginLeft={'350px'} gutterBottom>
          Training History
        </Typography>
        <Box sx={{ maxWidth: '80%', marginLeft: '350px', paddingRight: '24px' }}>
          {trainingHistory && trainingHistory.length > 0 ? (
            trainingHistory.map(dayGroup => (
              <Accordion key={dayGroup._id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Sessions on {new Date(dayGroup._id).toLocaleDateString()}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {dayGroup.sessions.map((session, sessionIndex) => (
                    <Box key={session._id || sessionIndex} mb={2}>
                      <Typography variant="h6" gutterBottom>
                        Session {sessionIndex + 1}
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Exercise</TableCell>
                              <TableCell align="right">Sets</TableCell>
                              <TableCell align="right">Reps</TableCell>
                              <TableCell align="right">Weight (kg)</TableCell>
                              <TableCell align="right">Duration</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {session.exercises.map((exercise, exIndex) => (
                              <TableRow key={exercise._id || exIndex}>
                                <TableCell component="th" scope="row">
                                  {exercise.exerciseDetails?.name || 'Unknown Exercise'}
                                </TableCell>
                                <TableCell align="right">{exercise.sets}</TableCell>
                                <TableCell align="right">{exercise.reps}</TableCell>
                                <TableCell align="right">{exercise.weight || '-'}</TableCell>
                                <TableCell align="right">
                                  {exercise.duration ? `${exercise.duration.value} ${exercise.duration.unit}` : '-'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography>No training history available.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default TrainingRecord
