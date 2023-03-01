import React from 'react';
import CheckBox from '@react-native-community/checkbox';

export interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({value, onChange}: CheckboxProps): JSX.Element {
  return (
    <>
      {/* @ts-expect-error todo missing type defs */}
      <CheckBox
        animationDuration={0.3}
        value={value}
        onValueChange={onChange}
        onTintColor="#6200EE"
        onCheckColor="#6200EE"
      />
    </>
  );
}
