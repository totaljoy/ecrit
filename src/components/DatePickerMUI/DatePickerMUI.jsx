import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';

export default function DatePickerValue({value, onChange}) {

  const StyledDatePicker = styled(DatePicker)({
    '.MuiPickersToolbar-root': {
      color: '#1565c0',
      borderRadius: '10px',
      borderWidth: '1px',
      borderColor: '#2196f3',
      border: '1px solid',
      backgroundColor: '#90caf9',
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDatePicker 
                  value={value}
                  onChange={onChange}
        />
    </LocalizationProvider>
  );
}