import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Banner: React.FC = () => (
  <Carousel autoplay effect="fade" speed={300} style={{marginTop:'47px'}}>
    <div>
      <h3 style={contentStyle}><img style={{width:'100%'}} src="https://cdn.pnj.io/images/promo/173/egift-t7-1972x640CTA__1_.jpg" alt="" /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img style={{width:'100%'}} src="https://cdn.pnj.io/images/promo/191/watch-t11-v2-1972_x_640__CTA_.jpg" alt="" /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img style={{width:'100%'}} src="https://cdn.pnj.io/images/promo/192/pnjfast-1972x640CTA.jpg" alt="" /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img style={{width:'100%'}} src="https://cdn.pnj.io/images/promo/194/tab_sale_chung_t12_-_1972x640-CTA.jpg" alt="" /></h3>
    </div>
  </Carousel>
);

export default Banner;
