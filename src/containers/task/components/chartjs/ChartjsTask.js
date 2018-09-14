import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class ChartjsTask extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        let data = {
            labels: [
                'Red',
                'Green',
            ],
            datasets: [{
                data: [1, 0],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ]
            }]
        };
        return (
            <div>
                <Pie data={data} />
            </div>
        );
    }
}


export default ChartjsTask;