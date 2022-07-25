import React, {useEffect, useState} from 'react'
import { Doughnut } from 'react-chartjs-2';
import Axios from 'axios';
import Cookies from 'js-cookie'



function CirclGraph() {

    const [chartset, setchartset] = useState({})

    useEffect(()=>{
        let isAuthenticated = JSON.parse(Cookies.get('users'));

        let salesdata = [];

        Axios.get(`/data`).then((response)=>{
            console.log(response);
            if(response.success == true){

                setchartset({
                    labels: ['low', 'remain', 'handles'],
                    datasets: [
                        {
                          label: 'Sales marketing',
                          fill: true,
                          data: [response.data.data.low[0].low, response.data.data.low[0].remain, response.data.low[0].upcoming],
                          // you can set indiviual colors for each bar
                          backgroundColor: ['green', 'red', 'blue'],
                          borderWidth: 1,
                        }
                    ]
                })
            }
        });

        

        

    },[])

    return (
        <div className="chart">          
            <Doughnut  height={400}  data={chartset} options={{maintainAspectRatio: false, responsive: true}}/>
        </div>
    )
}

export default CirclGraph
