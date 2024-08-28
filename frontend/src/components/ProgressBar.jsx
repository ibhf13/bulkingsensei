import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, LinearProgress, styled } from '@mui/material'

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}))

const ProgressBar = ({ value }) => {
  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Typography color="black" fontStyle="bold">{`${value}%`}</Typography>
      <StyledLinearProgress variant="determinate" value={value} />
    </Box>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ProgressBar
