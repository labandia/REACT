import React from 'react';
import logo from './logo.svg';
import './App.css';

function Header({title}: {title : string}){
    return <h1>{title}</h1>
}


function App() {
  return (
    <div className="App">
        <Header title="sdsds"></Header>
    </div>
  );
}

export default App;
