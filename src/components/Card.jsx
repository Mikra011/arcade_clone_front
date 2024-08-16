import React from 'react';

const Card = ({ item }) => (
  <div className="w-[440px] border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
    <div
      className="w-full h-[144px] bg-cover bg-center"
      style={{ backgroundImage: `url(${item.section_img_url})` }}
    ></div>
    <div className="p-4 text-center text-gray-800 bg-gray-100">
      {item.section_name}
    </div>
  </div>
);

export default Card;
