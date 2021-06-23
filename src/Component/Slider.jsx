
import React from 'react';
import '../css/Slider.css';
export default function Slider() {
   
    return(
      <div class="banner-background">
      <div className="content-main">
        <table style={{display:'inline-block',transform:'translateY(80%)'}} >
          <tr>
            <td>
              <h4 className="text-mot">Chúc bạn một ngày mới tốt lành</h4>
            </td>
          </tr>
          <tr>
            <td className="button-zone">
              {/* <h5 className="text-hai">Hãy <a className="text-a" href="/login">Đăng nhập</a> hoặc <a className="text-a" href="/login">Đăng ký</a> ngay để trải nghiệm</h5> */}
            </td>
          </tr>
        </table>
        <div className="content-img">
          <img src="/img/1.jpg"/>
        </div>
      </div>
    </div>
          
        
    );
}