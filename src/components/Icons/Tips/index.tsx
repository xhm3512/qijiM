import React from 'react';
import { paramsCheck } from '../params';

export default function TipsSvg() {
  return (
    <svg {...paramsCheck}>
      <path d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 85.333333a426.666667 426.666667 0 1 0 0 853.333334A426.666667 426.666667 0 0 0 512 85.333333z m-2.986667 242.090667l6.485334 0.597333a36.010667 36.010667 0 0 1 29.525333 35.498667v350.037333h85.162667c19.882667 0 36.010667 16.128 36.010666 36.010667L665.6 756.053333a36.010667 36.010667 0 0 1-35.413333 29.610667h-242.346667a36.010667 36.010667 0 0 1-36.010667-36.096l0.597334-6.4a36.010667 36.010667 0 0 1 35.413333-29.610667h85.162667v-314.026666H413.013333a36.010667 36.010667 0 0 1-36.010666-36.010667l0.597333-6.485333a36.010667 36.010667 0 0 1 35.328-29.525334h96.170667-0.085334z m0.597334-108.032a36.608 36.608 0 1 1 0 73.216 36.608 36.608 0 0 1 0-73.216z"></path>
    </svg>
  );
}