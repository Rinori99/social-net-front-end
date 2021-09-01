import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function DefaultComponent() {
    
    return (
        <Redirect to="browser/home"></Redirect>
    )
}

export default DefaultComponent;