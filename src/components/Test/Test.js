import React, { useEffect } from 'react';

import AgePie from '../AgePie/AgePie';
import SexPie from '../SexPie/SexPie';
// import DisMap from '../DisMap/DisMap';
import YieldLine from '../YieldLine/YieldLine';
import EMap from '../EMap/EMap';
// import DemoChoroplethMap from '../DemoChoroplethMap/DemoChoroplethMap';
import TopUsers from '../TopUsers/TopUsers';
import PropComp from '../PropComp/PropComp';
import ProdClass from '../ProdClass/ProdClass';
import Deftooltip from '../Deftooltip/Deftooltip'
import AreaLine from '../AreaLine/AreaLine';
import { useSearchParams } from 'react-router-dom';
export default function Test() {

    const [params] = useSearchParams()

    useEffect(() => {
        //console.log('params:', params.get('key'));
    }, [])

    return (
        <div id='test'>
            <div id='container'>
                <div style={{ width: 400, height: 400 }}><SexPie data1={['12', '23']} /></div>
                <div style={{ width: 600, height: 500 }}><AgePie /></div>
                {/* <div><DisMap /></div> */}
                <YieldLine />
                <div style={{ width: '80%' }}><EMap /></div>
                {/* <DemoChoroplethMap /> */}
                <TopUsers />
                <div style={{ margin: '50px 0' }}><PropComp /></div>
                <ProdClass />
                <Deftooltip />
                <AreaLine />
            </div>
        </div>
    )
}
