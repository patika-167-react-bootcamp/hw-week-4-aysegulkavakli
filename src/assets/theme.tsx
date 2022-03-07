import { createTheme } from "@mui/material";
import {indigo} from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            light: indigo[50],
            main: indigo[500],
            dark: indigo[700],
            contrastText: '#fff',
        },
    },
});