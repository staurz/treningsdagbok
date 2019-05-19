import React from 'react';
import {Bar} from 'react-chartjs-2';



export default class TotalBelastning extends React.Component {
    render() {

        const data = {
            labels: this.props.labels,
            datasets: [
                {
                    label: 'Antall treninsøkter',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.props.data,
                }
            ]
        };

        return (
            <div className="myChartContainer">
                <h2>Antall treningsøkter</h2>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
};