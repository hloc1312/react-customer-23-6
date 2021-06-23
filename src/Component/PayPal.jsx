import React, { useEffect, useState,useRef } from 'react';
import '../css/Payment.css';
import {useHistory} from 'react-router'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import { Form, Input, Button, notification } from 'antd';

export default function Paypal() {
    const history=useHistory();
  var sl=history.location.state.sl;
  var Tong=history.location.state.gia;
  var makhachhang=history.location.state.makhachhang;
  var id=history.location.state.id
  var a= Math.round(history.location.state.gia/ 23000)
  const onCancel=()=>{
    history.push(`/detail/${id}`)
  }
  var app = sessionStorage.getItem('type');
  var user = sessionStorage.getItem('maUser');

  const paypal=useRef()
    console.log(history.location.state.gia)
    useEffect(()=>{
        window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: a
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
                var point= Math.floor(Tong/10000)
                console.log(point)
                if(app=="OKA2")
                {
                    Axios.put("https://gift-api-v1.herokuapp.com/customer/updatepoint",{khach_hang_id:makhachhang,diem_tich_luy:point})
                }else{
                  Axios.post(`https://oka1kh.azurewebsites.net/api/user/update_point/${makhachhang}`,{point:point}).then((respone)=>{
                  })

                   
                }

                Axios.post("https://oka2-hv.herokuapp.com/customer/payment",{ma:id,tong:Tong,sl:sl,maKh:makhachhang})
                  notification['success']({
                      message: 'Thanh toán thành công',
                    });
                    history.push("/");  
                    // history.go(0);
        },
        onError: (err) => {
          console.log(err);
          notification['error']({
            message: 'Đã xảy ra lỗi trong quá trình thanh toán',  
          });
        },
      })
      .render(paypal.current);
    },[])
    return(
      <div>
        <div className="check-out-all">
          <div ref={paypal} className="btn-check-out"></div>
        </div>
        <div style={{textAlign:'center'}}>
          <button onClick={onCancel} className="btn-cancel-check-out">Hủy thanh toán</button>
          
        </div>
      </div>
        
        
    )
}
