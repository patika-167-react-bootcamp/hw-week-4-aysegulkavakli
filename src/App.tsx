import React from 'react';
import './App.css';
import Auth from "./main/Auth";
import {ThemeProvider} from "@mui/material";
import {theme} from "./assets/theme"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <Auth />
          </div>
      </ThemeProvider>


  );
}

export default App;
