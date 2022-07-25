import React, {useEffect, useState, useRef} from 'react'
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import Cookies from 'js-cookie'


// const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
//     datasets: [
//         {
//           label: 'Popularity of colours',
//           fill: true,
//           data: [55, 60, 96, 90, 44],
//           // you can set indiviual colors for each bar
//           backgroundColor: '#045de9',
//           borderWidth: 1,
//         }
//     ]

    
// }

// const options = {
//     responsive: true,
//     maintainAspectRatio: false,

// }


function LineGraph() {

    const [chartset, setchartset] = useState({})
    const chartRef = useRef(null);

    useEffect(()=>{
        let isAuthenticated = JSON.parse(Cookies.get('users'));
        // const chart = chartRef.current;

        let maindata = [];
        let salesdata = [];

         Axios.get(`/data`).then((response)=>{
               if(response.success === true){

                    for(const dataobj of response.data.data){
                        maindata.push(dataobj.month);
                        salesdata.push(dataobj.totalsales);
                    }


                    setchartset({
                        labels: maindata,
                        datasets: [
                            {
                              label: 'Sales marketing',
                              fill: true,
                              data: salesdata,
                              // you can set indiviual colors for each bar
                              backgroundColor: 'green',
                              borderWidth: 1,
                            }
                        ]
                    })
               }
           });


       

    },[])

    return (
        <div className="chart">          
            <Line  height={400}  data={chartset} options={{maintainAspectRatio: false, responsive: true}}/>
        </div>
    )
}

export default LineGraph
