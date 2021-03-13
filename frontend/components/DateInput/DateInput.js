import React, {useState} from 'react';
import {Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const DateInput = ({
  date,
  onChange,
  minimumDate = new Date(),
  style,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    onChange(selectedDate);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <View style={style}>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="default"
          onChange={handleChange}
          value={date}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};
