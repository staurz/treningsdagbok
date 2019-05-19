import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import {groupBy} from "./utils";
import {isSameMonth, getISOWeek, addMonths} from 'date-fns';
export default class CurrentMonth extends React.Component {
    render() {
        const { records} = this.props;
        const currentMonth = new Date();
        const lastMonth  = addMonths(currentMonth, -1);
        const lastlastMonth = addMonths(lastMonth, -1);
        const sessionsCurrentMonth = records.filter(x => x.type === "Løping").filter(x => isSameMonth(currentMonth, x.dato) || isSameMonth(lastMonth, x.dato) || isSameMonth(lastlastMonth, x.dato));

        const groupedTotals = groupBy(sessionsCurrentMonth, x=> getISOWeek(x.dato));

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
                <h2>Kilometer pr uke</h2>
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