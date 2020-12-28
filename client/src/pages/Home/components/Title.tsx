import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Settings } from 'config';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      margin: '1rem',
    },
  })
);

const Title = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography component='h1' variant='h3'>
        {Settings.PAGE_NAME}
      </Typography>
    </div>
  );
};

export default Title;
