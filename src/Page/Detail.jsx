import '../css/Detail.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
var CurrencyFormat = require('react-currency-format');
export default function Detail(props) {
    const {id}=props.match.params;
    const [Detail,setDetail]=useState('');
    const [DiaChi,setDiaChi]=useState([]);
    const [DieuKien,setDieuKien]=useState([])
    const [DiaChi_1,setDiaChi_1]=useState([]);
    var app = sessionStorage.getItem('type');
    var temp=[]
    useEffect(async()=>{
        const ct= await Axios.post("https://oka2-hv.herokuapp.com/customer/details",{ma:id}).then((respone)=>{return respone.data})
        setDetail(ct) 
        temp=[]
        setDiaChi([])
        console.log(DiaChi)
        const diachi= await Axios.post("https://oka2-hv.herokuapp.com/customer/details_dc",{ma:id}).then((respone)=>{
            respone.data.forEach(element => {
               
                    if(Detail.Loai=="CH")
                    {
                        Axios.post("https://rental-apartment-huflit.herokuapp.com/api/customer/getDetailApartment",{id:element.MaDiaChi}).then((respone_1)=>{
                        temp.push(respone_1.data)
                        console.log(respone_1.data)
                        if(respone_1.data.length>0)
                        {
                            setDiaChi(DiaChi=>[...DiaChi,respone_1.data[0].TEN_NHA])
                        }
                        
                    })
                        Axios.get(`https://cnpmnc-noiluutru.herokuapp.com/api/export/nlt/ten?id=${element.MaDiaChi}`).then((respone_1)=>{
                            if(respone_1.data.length>0)
                            {
                                    setDiaChi(DiaChi=>[...DiaChi,respone_1.data[0].ten_noiluutru])
                                    console.log(respone_1.data[0])
                            }
                        })
                    }else if(Detail.Loai=="KS")
                    {
                        Axios.get(`https://traveloka-hotel.herokuapp.com/hotel/${element.MaDiaChi}`).then((respone_1)=>{
                            console.log(respone_1.data.recordset[0].Name)
                            setDiaChi(DiaChi=>[...DiaChi,respone_1.data.recordset[0].Name])
                        })
                        
                    }
                
                    
                
                
            });

        })  
        
        const dk =await Axios.post("https://oka2-hv.herokuapp.com/customer/details_dk",{ma:id}).then((respone)=>{return respone.data})
        if(dk.length==0)
        {
            
            setDieuKien([...DieuKien,"Không có điều kiện cho Voucher này"])
        }
        else
        {
            setDieuKien(dk)
        }
                
    },[Detail.Loai])    
    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${id}`)
      }
    return (
        
        <div style={{marginTop:'30px'}} className="detail">
            <div className="container"style={{width:'1000px'}}> 
                <div className="row detail-all">
                    <div className="col-lg-3 detail-img">
                        <div class="col--detail--1">
                        <img src={Detail.Hinh} width="240px" height="105px"/>    
                        </div>
                    </div>
                    <div className="col-lg-9">
                        
                        <p className="detail-ten">{Detail.TenVoucher} giảm {Detail.GiaTriSuDung}%</p>
                        <p className="detail-tloai">{Detail.MaLoaiVoucher}</p>
                        <p className="detail-dieukien">Hạn sử dụng:        {dateFormat(Detail.NgayCoHieuLuc, 'dd/mm/yyyy')} - {dateFormat(Detail.NgayHetHieuLuc, 'dd/mm/yyyy')}</p>
                        <p className="detail-gia">Giá: <CurrencyFormat value={Detail.GiaTien} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                        <Form.Item
                            className="form__row"
                            label="Điều kiện:"
                        >
                            {DieuKien.map((val)=>{
                                if(DieuKien[0]=="Không có điều kiện cho Voucher này")
                                {
                                    return <p>Không tồn tại điều kiện cho vouhcer này</p>
                                    
                                }
                                else
                                {
                                    if(val.LoaiDieuKien=='B')
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Giá tối thiểu cần đạt khi đặt phòng: <CurrencyFormat value={val.GiaTri} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                                    }
                                    else
                                    {
                                        return <p  style={{font:'14px'},{marginTop:'5px'}} >Số đêm tối thiểu cần đặt: {val.GiaTri} đêm </p>
                                    }
                                }
                                
                                    
                               
                                
                            })}
                        </Form.Item>
                        <Form.Item
                            className="form__row"
                            label="Địa điểm áp dụng:"
                        >
                            <ul>
                                {DiaChi.map((val)=>{
                                    
                                    return <a style={{font:'14px'},{marginTop:'5px'}} >{val}</a>
                                })}
                            </ul>
                            
                        </Form.Item>
                        <button type="button" className="detail-btn-mua" onClick={redirect}>Mua Ngay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
