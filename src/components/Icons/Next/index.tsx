import React from 'react';
import { paramsCheck } from '../params';

export default function Next() {
  return (
    <svg {...paramsCheck}>
      <path d="M672 512 672 512 352 192 320 224 624 528 320 832 352 864 688 528Z"></path>
    </svg>
  );
}
