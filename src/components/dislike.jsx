import React from 'react';

const HeartIconWithThickLine = ({color}) => (
    <div className='mt-[1px]'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={color} height="30px" width="40px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlSpace="preserve" stroke={color}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <g>
        <g>
          <path d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M381.804,281.636 l-114,114.011c-3.131,3.131-7.381,4.892-11.804,4.892c-4.423,0-8.674-1.761-11.804-4.892l-114-114.017 c-15.772-15.755-24.457-36.723-24.457-59.021s8.685-43.266,24.457-59.027c15.75-15.761,36.706-24.451,59.021-24.451 c22.315,0,43.272,8.691,59.032,24.462l7.75,7.745l7.761-7.756c15.75-15.761,36.706-24.451,59.021-24.451 s43.272,8.691,59.032,24.462c15.761,15.75,24.446,36.717,24.446,59.016S397.576,265.875,381.804,281.636z"/>
        </g>
      </g>
                {/* Thicker diagonal line cutting through the heart */}
                <line x1="40" y1="472" x2="472" y2="40" stroke="black" strokeWidth="40" />
            </g>
        </svg>
    </div>
);

export default HeartIconWithThickLine;
