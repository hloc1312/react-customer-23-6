import React,{useEffect,useState} from 'react';
import dateFormat from 'dateformat'
export default function Lich_Su_Kh(props){
    var CurrencyFormat = require('react-currency-format');

    const itemStyle={
        backgroundColor:props.bool %2===0?'#FFECFB':'#FFFFFC',
    }
    return(
        <tr style={itemStyle} >
            <td style={{width:'15%'}}>{props.ma}</td>
            <td style={{width:'20%'}}>{dateFormat(props.ngay, "dd/mm/yyyy")}</td>
            <td style={{width:'15%'}}><CurrencyFormat
                            value={props.giatri}
                            displayType={"text"}
                            thousandSeparator={true}
                          />{" "}</td>
            <td>{props.ghichu}</td>
            
        </tr>

       
    )
   
}
