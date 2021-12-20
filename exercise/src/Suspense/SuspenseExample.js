import React from 'react'
 

export const SuspenseExample = ({resources}) =>{
    const person = resources.person.read();

    return <div>{person.name.first}</div>;
};

