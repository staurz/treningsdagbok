import React from 'react';
import './App.css';
import {getShit} from "./airtableclient";
import TotalBelastning from "./totalBelastning";
import {groupBy} from "./utils";
import ManedsFordeling from "./manedsFordeling";
import CurrentMonth from "./currentMonth";
import LopingManed from "./lopingManed";
import NokkelTallContainer from "./nokkeltallContainer";


export default class Dagbok extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedYear: 2020
        };
    }

    componentDidMount() {
        getShit((x) => {
            this.setState({
                records: x
            });
        });
    }

    render() {
        if (!this.state.records) {
            return <h1>fetching</h1>
        }
        const {records, selectedYear} = this.state;
        const recordsSelectedYear = selectedYear ? records.filter(x => x.dato.getFullYear() === selectedYear) : records;

        const groupedTotals = groupBy(recordsSelectedYear, x => x.type);
        const labels = [...groupedTotals.keys()];
        const totalsummer = labels.map(x => {
            const belastning = groupedTotals.get(x);
            return belastning.length;
        });
        return (<div>
            <NokkelTallContainer records={records} selectedYear={selectedYear}/>
            <div className={"categoryContainer"}>
                <h1>Total belastning</h1>
                <TotalBelastning labels={labels} data={totalsummer}/>
                <ManedsFordeling records={recordsSelectedYear}/>
            </div>
            <div className={"categoryContainer"}>
                <h1>Løping</h1>
                <LopingManed records={recordsSelectedYear}/>
                <CurrentMonth records={recordsSelectedYear}/>
            </div>
        </div>);
    }
}