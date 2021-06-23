import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {} from 'antd';
import { Form, Input, Button, notification,Radio } from 'antd';
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import Axios from 'axios'
import '../css/Login.css'
import '../css/Voucher_1.css';


export default function Login(props) {
    const[username,setUsername]=useState('')
    const [pass,setPass]=useState('')
    const [app,setApp]=useState('OKA1')
    const [test, setT]=useState()
    useEffect(()=>{
        console.log(test)

    },[test])
    const history=useHistory();
    const[bool,setBool]=useState(false)
    async function onClick(){
        // Axios.post('',{username:username,pass:pass})
        // history.push("/")
        // e.preventDefault();
        if(app=="OKA1")
        {
            const login = await Axios.post('https://oka1kh.azurewebsites.net/api/user/login',{email:username,pass:pass}).then((respone)=>{
            return respone.data
            }).catch((err)=>err)
            if(login.status=="SUCCES")
            {
                Axios.get(`https://oka1kh.azurewebsites.net/api/userbyemail/${username}`).then((respone)=>{
                    props.setLogin(respone.data.user[0].userId,'OKA1')
                    history.push("/")
                })       
            }
            else{
            notification['error']({
                message: 'Đăng nhập thất bại',
                description:
                  'Vui lòng nhập lại tên đăng nhập, mật khẩu',
              });
            }
        }else
        {
            const login = await Axios.post('https://gift-api-v1.herokuapp.com/customer/login',{email:username,mat_khau:pass}).then((respone)=>{
                setT(respone.data)
            return respone.data
            }).catch((err)=>setT(err))
            console.log(test)
            console.log(login)
            if(login!=undefined)
            {
                props.setLogin(login.id,'OKA2')
                history.push("/")
            }else{
                notification['error']({
                    message: 'Đăng nhập thất bại',
                    description:
                      'Vui lòng nhập lại tên đăng nhập, mật khẩu',
                  });
            }
        }
        

        
    }
    const onChangeName=(e)=>{
        setUsername(e.target.value)
    }

    
    const onChangePass=(e)=>{
        setPass(e.target.value)
    }
    const onChangApp =(e)=>{
        setApp(e.target.value)
    }
    return (
        <div className="backgroud-all">
            <div className="form-body">
                <Form 
                name="normal_login"
                className="login-form form-center"
                // initialValues={{ remember: true }}
                // onFinish={onFinish}
                style={{height:'320px'}}
                >
                    <h2 className="header_1">Đăng Nhập</h2>
                <Radio.Group value={app} onChange={onChangApp} style={{marginBottom:'10px'}}>
                    <Radio value={"OKA1"}>OKA1</Radio>
                    <Radio value={"OKA2"}>OKA2</Radio>
                </Radio.Group>
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Không được để trống tài khoản' },
                           
                            
                        ]}
                        style={{maxWidth:'10% !important'}}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={onChangeName} placeholder="Tài Khoản"  />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Không được để trống mật khẩu' }]}
                    >
                        <Input.Password
                        onChange={onChangePass}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        // type="password"
                        placeholder="Mật Khẩu"
                        />
                    </Form.Item>
                    {/* <div className="form-forget">
                        <a href="" >Quên mật khẩu ?</a>
                    </div> */}
                    <Form.Item className="form-btn-login" style={{padding:'0',margin:'0'}}>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onClick}>
                    Đăng Nhập
                    </Button>
                    </Form.Item>
                    {/* <div className="form-register">
                        <Link to='/signin' style={{textAlign:'center'}}>Đăng Ký Tài Khoản ?</Link>
                    </div> */}
            </Form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setLogin: PropTypes.func.isRequired,
    setNoti: PropTypes.func.isRequired
  };