import React from 'react';
import NokkelTall from "./nokkeltall";
import {getISOWeek} from 'date-fns';

export default class NokkelTallContainer extends React.Component {
    render() {
        const {records, selectedYear} = this.props;
        if (! records) {
            return null;
    }
        const recordsSelectedYear = selectedYear ? records.filter(x => x.dato.getFullYear() === selectedYear) : records;
        const totalLopin = recordsSelectedYear.filter(x => x.type === "Løping").reduce((sum,elmt) => sum + elmt.distanse, 0).toFixed(0);
        const totalLangrenn = recordsSelectedYear.filter(x => x.type === "Langrenn").reduce((sum,elmt) => sum + elmt.distanse, 0).toFixed(0);
        const totalMinutter = recordsSelectedYear.reduce((sum, elmt) => sum + elmt.minutter, 0);
        const weeks = getISOWeek(new Date());
        const numSessionsPerWeek = (recordsSelectedYear.length / weeks).toFixed(1);
        return (
            <div className="nokkeltall-container">
                <NokkelTall value={recordsSelectedYear.length} title={`hittil i år`} subtitle={"økter"}/>
                <NokkelTall value={numSessionsPerWeek} title={"per uke"} subtitle={"økter"}/>
                <NokkelTall value={totalLopin} title={"Løping"} subtitle={"kilometer"}/>
                <NokkelTall value={totalLangrenn} title={"Langrenn"} subtitle={"kilometer"}/>
                <NokkelTall value={(totalMinutter/60).toFixed(1)} title={"Timer"} subtitle={"trening hittil i år"}/>
            </div>
        );
    }
};