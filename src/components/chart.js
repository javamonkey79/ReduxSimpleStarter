import _ from 'lodash';
import React from 'react';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from "react-sparklines";

export default ({data, unit, color}) => {
    function average(data) {
        return _.round(_.sum(data)/data.length);
    }

    return (
        <div>
            <Sparklines height={120} width={180} data={data}>
                <SparklinesLine color={color}/>
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{average(data)}{unit == 'F' ? <span>&#8457;</span> : unit }</div>
        </div>
    );
}