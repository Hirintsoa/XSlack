import { createTheme } from '@mui/material/styles';
import { deepOrange, teal } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: deepOrange,
        secondary: teal,
    }
})
export default theme;