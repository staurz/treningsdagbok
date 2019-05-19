import React from 'react';
import {Bar} from 'react-chartjs-2';
import {groupBy} from "./utils";
import {getMonth } from 'date-fns';

const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]

export default class ManedsFordeling extends React.Component {
    render() {
        const { records} = this.props;
        const groupedTotals = groupBy(records, x => months[getMonth(x.dato)]);
        const labels = [...groupedTotals.keys()];
        const totalsummer =  labels.map(x => {
            const belastning = groupedTotals.get(x);
            return belastning.length;
        });
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Antall treninsøkter',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: totalsummer,
                }
            ]
        };

        return (
            <div className={"myChartContainer"}>
                <h2>Månedsfordeling</h2>
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