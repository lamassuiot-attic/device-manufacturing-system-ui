import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.dark,
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
