import React from 'react'
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTrainingHistory } from '../hooks/useTrainingHistory'

const StatisticsPreview = () => {
  const navigate = useNavigate()
  const { data: trainingHistory, isLoading: isTrainingHistoryLoading } = useTrainingHistory()

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recent Training Statistics
      </Typography>
      {isTrainingHistoryLoading ? (
        <Typography>Loading training history...</Typography>
      ) : trainingHistory && trainingHistory.length > 0 ? (
        <TableContainer sx={{ maxHeight: 300, overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Exercise</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">Weight (kg)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingHistory.slice(0, 5).flatMap(dayGroup =>
                dayGroup.sessions.flatMap(session =>
                  session.exercises.map((exercise, index) => (
                    <TableRow key={`${dayGroup._id}-${index}`}>
                      <TableCell>{index === 0 ? new Date(dayGroup._id).toLocaleDateString() : ''}</TableCell>
                      <TableCell>{exercise.exerciseDetails?.name || 'Unknown Exercise'}</TableCell>
                      <TableCell align="right">{exercise.sets}</TableCell>
                      <TableCell align="right">{exercise.reps}</TableCell>
                      <TableCell align="right">{exercise.weight || '-'}</TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No recent training history available.</Typography>
      )}
      <Button variant="text" color="primary" onClick={() => navigate('/trainingrecord')} sx={{ mt: 2 }}>
        View Full Training Record
      </Button>
    </Paper>
  )
}

export default StatisticsPreview
