import React from 'react';
import sltDataModel from '../../Models/sltDataModel';
import apiService from '../../../services/apis';

interface EntryFieldProps {
  shiftData: sltDataModel;
  updatedList;
}

const ViewSLTHistory = ({ shiftData, updatedList }: EntryFieldProps) => {
  const fetchSltHistoryByID = async () => {
    const path = `shift/shift?shift_id=${shiftData.shift_id}`;
    const response = await apiService.getSltData(path);
    if (response.status === 200 && response.data && response.data.length > 0) {
      updatedList(response.data[0]);
    }
  };

  return (
    <span
      aria-hidden="true"
      id="shiftId"
      style={{ cursor: 'pointer', textDecoration: 'underline' }}
      onClick={() => fetchSltHistoryByID()}
    >
      {shiftData.shift_id}
    </span>
  );
};

export default ViewSLTHistory;
