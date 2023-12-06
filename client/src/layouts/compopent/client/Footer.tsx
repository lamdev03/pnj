import React from 'react';

type Props = {};

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <div style={{ background: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
      © 2023 Your Company Name. All Rights Reserved.
    </div>
  );
};

export default Footer;
