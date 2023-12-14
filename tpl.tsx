import React from 'react';
import MediaQuery from 'react-responsive';
import { MOBILE_WIDTH } from '@/constant';
import SeoComponent from '@/component/SeoHemlet';
import H5 from './h5';
import PC from './pc';


export default (props) => {
  return (
    <>
      {/* 首页使用默认的seo 元素 */}
      <SeoComponent />
      <MediaQuery minWidth={MOBILE_WIDTH + 1}>
        <PC {...props} />
      </MediaQuery>
      <MediaQuery maxWidth={MOBILE_WIDTH}>
        <H5 {...props} />
      </MediaQuery>
    </>
  );
};
