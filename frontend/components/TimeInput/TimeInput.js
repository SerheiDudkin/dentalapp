import React, {useState} from 'react';
import {Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const TimeInput = ({time, onChange}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    onChange(selectedDate);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text>
          {time.getHours()}:{time.getMinutes()}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          mode="time"
          display="default"
          onChange={handleChange}
          value={time}
        />
      )}
    </View>
  );
};
