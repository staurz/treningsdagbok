import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import {groupBy} from "./utils";
import {getMonth} from 'date-fns';

const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]

export default class LopingManed extends React.Component {
    render() {
        const { records} = this.props;


        const lopeSessions = records.filter(x => x.type === "Løping");

        const groupedTotals = groupBy(lopeSessions, x => months[getMonth(x.dato)]);
        const labels = [...groupedTotals.keys()];
        const totalsummer =  labels.map(x => {
            const belastning = groupedTotals.get(x);
            const sumBelastning =  belastning.reduce((sum, elmt) => sum + elmt.distanse, 0);
            return sumBelastning.toFixed(0);
        });

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Kilometer',
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
                <h2>Kilometer pr måned</h2>
                <HorizontalBar
                    data={data}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
};