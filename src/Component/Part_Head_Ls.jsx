import '../css/ListVoucher_kh.css'
import React,{useEffect,useState} from 'react'

export default function Lich_Su_Kh(props){
    const list=props.listKH;
    return(
   
        <td style={{whiteSpace:'nowrap'}}>{list.title}</td>
       
    )
   
}