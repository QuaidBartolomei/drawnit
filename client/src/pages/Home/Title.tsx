import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Settings } from 'config';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {},
  })
);

const Title = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography>{Settings.PAGE_NAME}</Typography>
    </div>
  );
};

export default Title;
