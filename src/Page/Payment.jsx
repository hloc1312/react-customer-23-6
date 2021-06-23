import React, { useEffect, useState, useRef} from 'react'
import '../css/Payment.css'
import dateFormat from 'dateformat'
import {Redirect, useHistory} from 'react-router-dom'
import Axios from 'axios'
import Paypal from '../Component/PayPal'
import { Form, Input, Button, notification } from 'antd';

var CurrencyFormat = require('react-currency-format');

export default function Payment(props){
    const paypal = useRef();
    const {id}=props.match.params;
    const [Detail,setDetail]=useState('');
    const [Tong, setTong]=useState(0);
    const [sl, setSL]=useState(0);
    const [sl_1, setSL_1]=useState(0);
    const [bool,setBool]=useState(false)
    var a;
    var makhachhang = sessionStorage.getItem('maUser');
    console.log(makhachhang)
    useEffect(async()=>{
        const detail = await Axios.post("https://oka2-hv.herokuapp.com/customer/details",{ma:id})
        setDetail(detail.data) 
        setTong(detail.data.GiaTien)
        setSL_1(detail.data.SoLuong)
        setSL(1)  
    },[])
    const history=useHistory();


    
    var int
    var A=Detail.GiaTien;
        const onClickPlus=()=> {
            int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            if(sl_1>int)
            {
                int++;
                A=A*int
                document.getElementById('so').value=int;
                setTong(A)
                setSL(int)
            }
            

        }
    
        const onClickMinus=()=> {
            int=parseInt(document.getElementById('so').value,10);
            int = isNaN(int) ? 0 : int;
            if(int>1 )
            {
                int--;
                A=A*int
                document.getElementById('so').value=int;
                setTong(A)
                setSL(int)
            }
            

        }
        const onClick=()=>{
          
          console.log(paypal)
          setBool(true)
        }
        const onCancel=()=>{
          paypal.current.value=null
        }
        const [listvoucher,setlistVoucher]=useState()
        return(
          <div>
            {bool?(
              <Redirect to={{
                pathname:"/checkout",
                state: { gia: Tong,
                          id:id, makhachhang:makhachhang , sl:sl}
              }}/>
            ):(
              <div className="container-fluid">
              <div className="row" style={{ padding: "20px" }}>
                <div className="col-lg-8 payments-all">
            
                  <div className="container-fuild">
                    <div className="row">
                      <div className="col-lg-3" style={{padding:'0px',margin:'auto'}}>
                        <img
                          src={Detail.Hinh}
                          style={{ width: "218px", height: "105px" }}
                        ></img>
                      </div>
                      <div className="col-lg-9" style={{padding:'15px'}}>
                        <h3>
                          {Detail.TenVoucher} giảm {Detail.GiaTriSuDung}%
                        </h3>
                        <p className="detail-tloai"></p>
                        <p className="payment-date">
                          <span>Hạn sử dụng: </span>{" "}
                          {dateFormat(Detail.NgayCoHieuLuc, "dd/mm/yyyy")} -{" "}
                          {dateFormat(Detail.NgayHetHieuLuc, "dd/mm/yyyy")}
                        </p>
                        <p class="payment-quantity">
                          {" "}
                          <span>Số lượng: </span>
                          <button type="button" className="btn-minus" onClick={onClickMinus}>
                          <i class="fas fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="input-quantity"
                            id="so"
                            disabled={true}
                            defaultValue={1}
                          />
                          <button className="btn-plus" onClick={onClickPlus}>
                            <i class="fas fa-plus"></i>
                          </button>
                        </p>
                        <p className="payment-price">
                          Đơn Giá:{" "}
                          <CurrencyFormat
                            value={Detail.GiaTien}
                            displayType={"text"}
                            thousandSeparator={true}
                          />{" "}
                          VNĐ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 payments-btn-tt-all">
                  <h4>Thanh toán</h4>
                  <hr style={{fontWeight:'bold'}}/>
                  <div className="payments-btn-tt">
                    <h5 className="total-price">
                      Tổng tiền:{" "}
                      <span className="total-price-span">
                        <CurrencyFormat
                          value={Tong}
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                        VNĐ
                      </span>
                    </h5>
                    <button type="button" className="btn-buy" onClick={onClick}>
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
            
         
        )
    }


