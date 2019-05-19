import React from 'react';
import NokkelTall from "./nokkeltall";
import {getISOWeek} from 'date-fns';

export default class NokkelTallContainer extends React.Component {
    render() {
        const {records} = this.props;
        if (! records) {
            return null;
        }
        const totalLopin = records.filter(x => x.type === "Løping").reduce((sum,elmt) => sum + elmt.distanse, 0).toFixed(0);
        const totalLangrenn = records.filter(x => x.type === "Langrenn").reduce((sum,elmt) => sum + elmt.distanse, 0).toFixed(0);
        const antallStyrkeokter = records.filter(x => x.type === "Styrke" || x.type === "Barry's Bootcamp");

        const weeks = getISOWeek(new Date());
        const numSessionsPerWeek = (records.length / weeks).toFixed(1);
        return (
            <div className="nokkeltall-container">
                <NokkelTall value={records.length} title={"hittil i år"} subtitle={"økter"}/>
                <NokkelTall value={numSessionsPerWeek} title={"per uke"} subtitle={"økter"}/>
                <NokkelTall value={totalLopin} title={"Løping"} subtitle={"kilometer"}/>
                <NokkelTall value={totalLangrenn} title={"Langrenn"} subtitle={"kilometer"}/>
                <NokkelTall value={antallStyrkeokter.length} title={"Styrketrening"} subtitle={"økter"}/>
            </div>
        );
    }
};