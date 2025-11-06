import React from 'react';
import Weather from './components/weather API'


function App(){

    const secureAPIKey = process.env.REACT_APP_MYAPI;

    return(
        <Weather myAPI = {secureAPIKey}/>
    );
}

export default App;