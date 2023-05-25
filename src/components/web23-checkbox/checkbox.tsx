import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {View} from 'react-native';

import tw from 'utils/tailwind';

type IWeb23CheckBox = {
  id?: string;
  value?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
};

const Web23CheckBox: React.FC<IWeb23CheckBox> = ({
  checked,
  children,
  onChange,
}) => {
  return (
    <BouncyCheckbox
      size={18}
      isChecked={checked}
      fillColor="#D7FC51"
      unfillColor="transparent"
      iconComponent={
        <View
          style={{
            ...tw`w-2 h-3 mb-1 border-b-2 border-r-2 border-black`,
            transform: [{rotate: '45deg'}],
          }}
        />
      }
      textComponent={<View style={tw`ml-2`}>{children}</View>}
      iconStyle={{borderRadius: 2}}
      innerIconStyle={{borderRadius: 2}}
      textStyle={{color: '#FFFF'}}
      onPress={onChange}
    />
  );
};

export default Web23CheckBox;
