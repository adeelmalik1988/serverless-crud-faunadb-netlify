import React from "react"
import Todo from "../src/components/todo"
import './App.css';
import Header from "../src/components/header"

import { ThemeProvider } from 'theme-ui'
import theme from './theme'




function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <Header />
        <Todo />
      </div>
    </ThemeProvider>
  );
}

export default App;
