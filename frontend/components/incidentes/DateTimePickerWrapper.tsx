import React from 'react';
import { Platform } from 'react-native';

let DateTimePickerWrapper: any;

if (Platform.OS === 'web') {
  const ReactDatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');

  DateTimePickerWrapper = ({ value, mode, onChange }: any) => {
    if (mode === 'date') {
      return (
        <ReactDatePicker
          selected={value}
          onChange={(date: Date) => onChange(null, date)}
          dateFormat="yyyy-MM-dd"
        />
      );
    } else if (mode === 'time') {
      return (
        <ReactDatePicker
          selected={value}
          onChange={(date: Date) => onChange(null, date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
        />
      );
    }
    return null;
  };
} else {
  const DateTimePicker = require('@react-native-community/datetimepicker').default;

  DateTimePickerWrapper = ({ value, mode, onChange }: any) => (
    <DateTimePicker
      value={value}
      mode={mode}
      display="default"
      onChange={onChange}
    />
  );
}

export default DateTimePickerWrapper;
