import React from 'react';
import './Dashboard.css';
import { faChartLine} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LineGraph from './lineGraph';
import CirclGraph from './circleGraph';

function DashboardPage() {

    return (
        <div className="dash">
            <div className="dash__title">
                <FontAwesomeIcon style={{marginRight: '10px'}} icon={faChartLine} />
                <p>Dashboard</p>
            </div>

            

            <div className="dash__main">
                <div className="dash__graph">
                    <p>Sales report</p>
                    <LineGraph />
                </div>

                <div className="dash__graph">
                    <p>Stocks Calculation</p>
                    {/* <CirclGraph /> */}
                    <div>
                        
                    </div>
                </div>
            </div>

            <div className="dash__sales">
                <div className="dash__salesreport">
                    <p>Sales report by product</p>
                </div>   
            
                <div className="dash__salesreport">
                    <p>Expiration and low stocks</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
