import React from 'react';
import Title1 from '../../../ui/titles/Title1';
import Title2 from '../../../ui/titles/Title2';

const FeeBreakdown = () => {
  return (
    <div className="fee-breakdown">
      <Title1 isBold={true}>Fee breakdown</Title1>
      <table>
        <tbody>
          <tr>
            <td className="fee-type">
              <Title2>Restocking (per item)</Title2>
            </td>
            <td>
              <Title2>$59</Title2>
            </td>
          </tr>
          <tr>
            <td className="fee-type">
              <Title2>Reschedule or cancel 2 business days prior to scheduled delivery</Title2>
            </td>
            <td>
              <Title2>$109</Title2>
            </td>
          </tr>
          <tr>
            <td className="fee-type">
              <Title2>Reschedule or cancel 1 business day prior to scheduled delivery</Title2>
            </td>
            <td>
              <Title2>$179</Title2>
            </td>
          </tr>
          <tr>
            <td className="fee-type">
              <Title2>Reschedule or cancel day of delivery</Title2>
            </td>
            <td>
              <Title2>$209</Title2>
            </td>
          </tr>
          <tr>
            <td className="fee-type">
              <Title2>Unsuccessful deliveries*</Title2>
            </td>
            <td>
              <Title2>$149</Title2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FeeBreakdown;
