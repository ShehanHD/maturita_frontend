import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4, 4, 3),
    },
}));