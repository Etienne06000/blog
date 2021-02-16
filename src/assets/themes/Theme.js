import { createMuiTheme } from '@material-ui/core/styles';

// Thème du tableau
const Theme = createMuiTheme({ 
  palette: {
    primary: {
      main: '#435f88',
      background: 'rgba(0,0,0,0.04)',
    },
    secondary: {
      main: '#435f88',
      background: 'rgb(36 36 39)',
      //background: 'rgba(61,33,222, 1)',
    },
    typography: {
      h2: {
        color: "#fff"
      }
    }
  },
});

// Primary : #81c784
// Secondary #b39ddb

export default Theme;
