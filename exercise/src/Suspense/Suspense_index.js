import React, {Suspense} from 'react'
import {createResource} from './personapi';
import {SuspenseExample} from './SuspenseExample';


const resources = createResource();

function Suspense_index() {
    return (
        <div>
            <Suspense fallback={<h1>Loading....</h1>}>
                <SuspenseExample resources={resources}/>
            </Suspense>            
        </div>
    )
}

export default Suspense_index
