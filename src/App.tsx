import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div> 
        <AppRoutes/>
      </div>
    </ThemeProvider>
  )
}

