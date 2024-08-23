import React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const SquarePaperButton = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
}));

export default SquarePaperButton;