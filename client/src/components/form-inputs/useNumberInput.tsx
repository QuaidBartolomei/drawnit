import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import React, { useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput, {
  OutlinedInputProps,
} from '@material-ui/core/OutlinedInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        margin: '.5rem',
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  })
);

interface Props  {
  label: string;
  max?: number;
  min?: number;
}

export default function useNumberInput(
  {label,max,min,...props}: Props & OutlinedInputProps = {
    label: 'label',
    max: 100,
    min: 0,
  }
) {

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const Component = () => (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant='outlined'
    >
      <OutlinedInput
        id='outlined-adornment-weight'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        endAdornment={<InputAdornment position='end'>Px</InputAdornment>}
        aria-describedby='outlined-weight-helper-text'
        inputProps={{
          'aria-label': label,
        }}
        labelWidth={0}
        {...(props as OutlinedInputProps)}
      />
      <FormHelperText id='outlined-weight-helper-text'>
        {label}
      </FormHelperText>
    </FormControl>
  );

  return {
    Component,
    value,
  };
}
