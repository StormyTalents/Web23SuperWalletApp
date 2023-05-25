import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';

const Web23Toggle: React.FC<{
  checked: boolean;
  setChecked: () => void;
}> = ({checked, setChecked}) => {
  return (
    <ToggleSwitch
      isOn={checked}
      onColor="#90B528"
      offColor="#69696952"
      size="large"
      onToggle={setChecked}
    />
  );
};

export default Web23Toggle;
