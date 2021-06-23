import '../css/ListVoucher_kh.css'
import { Form, Input, Button,Select, DatePicker,Checkbox} from 'antd';
import Voucher from '../Component/Voucher';
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import dateFormat from 'dateformat'
import {useHistory} from 'react-router-dom'
import Part_Head_Ls from '../Component/Part_Head_Ls'
import Part_Body_Ls from '../Component/Part_Body_Ls'
export default function ListV(props) {

    const [Detail,setDetail]=useState([]);
    const [LS,setLS]=useState([]);
    const [bool,setBool] =useState(true)
    const [text,setText] =useState('Xem lịch sử')
    var dem=0
    const ma = sessionStorage.getItem('maUser');
    useEffect(()=>{
        Axios.post("https://oka2-hv.herokuapp.com/customer/list_kh",{ma:ma}).then((respone)=>{
            setDetail(respone.data) 
            console.log(Detail)
        })
        Axios.post("https://oka2-hv.herokuapp.com/customer/history",{makh:ma}).then((respone)=>{
            setLS(respone.data) 
            console.log(LS)
        })
    },[])    
    const onClick =()=>{
        setBool(!bool)
        if(!bool){
            setText('Xem lịch sử')
        }
        else
        {
            setText('Xem túi voucher')
        }
    }

    const history=useHistory();
    const redirect = () => {
        history.push(`/payment/${ma}`)
      }
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-3" style={{paddingRight:'0px'}}>
                <div className="trai_kh">
                    <h3 className="text-center" style={{marginTop:'16px'}}>Thông Tin Cá Nhân</h3>
                    <p className="kh_font"><b>Mã Khách Hàng:</b> {ma}</p>
                    <p className="kh_btn_ls">
                        <button className="text-ls-kh" onClick={onClick}>{text}</button>
                    </p>
                </div>
            </div>
            <div className="col-lg-9">
                {bool?(
                    <ul className="vouchers-kh">
                        {Detail.map((val)=>{
                        return <Voucher key={val.MaVoucher} ma={val.MaVoucher} mamua={val.MaMua}  hinh ={val.Hinh} title ={val.TenVoucher} sdate={val.NgayCoHieuLuc} edate={val.NgayHetHieuLuc} ngay={val.Ngay}sl={val.SoLuong} ></Voucher>
                        })}
                    </ul>
                    
                ):(
                    <table className="table" style={{width:'90%',margin:'0 auto',marginTop:'20px',textAlign:'center'}}>
                    <thead style={{backgroundColor:'rgb(255 181 156)',fontWeight:'bold'}}>
                        <tr>
                            {/* {list.map((val)=>{return <Part_Head_Ls key={val.id} listKH={val}/> })} */}
                            <td>Mã Voucher</td>
                            <td>Ngày Sử Dụng</td>
                            <td>Giá Trị Sử Dụng</td>
                            <td>Ghi Chú</td>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            LS.map((val)=>{
                                dem++
                                return <Part_Body_Ls key={val.MaSuDung} bool={dem} ma={val.MaVoucher} ngay={val.Ngay} giatri={val.GiaTriGiam} ghichu={val.GhiChu}/> 
                                })}
                    </tbody>

                </table>
                )}
                
            
            </div>
        </div>
    </div>
    )
}