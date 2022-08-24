import React from 'react';
import { Statisticts } from './Statisticts/Statisticts';
export const ReportView = ({ screenWidth }) => {
  return (
    <div>
      <Statisticts screenWidth={screenWidth} />
    </div>
  );
};
