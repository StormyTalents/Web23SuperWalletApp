import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';

import tw from 'utils/tailwind';

import VisibilityOffSVG from '../../assets/icons/visibility_off.svg';

const MnemonicBox: React.FC<{
  phrase?: string[];
  extendMode?: boolean;
  setExtendMode?: (param: boolean) => void;
}> = ({phrase, extendMode, setExtendMode}) => {
  const [show, setShow] = useState<boolean>(false);
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={tw`relative w-full rounded-2xl`}
      onPress={() => setShow(prev => !prev)}>
      <View style={tw.style(!show ? 'bg-grey-900 rounded-xl' : '')}>
        <View
          style={tw`bg-grey-900 border border-grey-800 rounded-xl px-3 py-4   max-h-[210px] min-h-[210px]`}>
          {show && (
            <>
              <FlatList
                columnWrapperStyle={tw`justify-between`}
                numColumns={3}
                data={phrase}
                ItemSeparatorComponent={() => <View style={tw`h-2`} />}
                renderItem={({item, index}) => (
                  <MenemonicPhrase index={index + 1} text={item} />
                )}
                keyExtractor={(item, index) => item + '___' + index}
              />
              {extendMode !== undefined && setExtendMode !== undefined && (
                <Text
                  style={tw`mt-4 text-xs font-medium text-center text-white underline`}
                  onPress={() => setExtendMode(!extendMode)}>
                  {t('Change to')} {extendMode ? '24' : '12'} {t('word phrase')}
                </Text>
              )}
            </>
          )}
        </View>
      </View>

      <View
        style={{
          ...tw.style(
            !show ? 'flex absolute w-[90%] left-[5%] top-[70px]' : 'hidden',
          ),
        }}>
        <View style={tw`flex flex-row justify-center mb-2`}>
          <VisibilityOffSVG />
        </View>
        <Text style={tw`text-xs font-bold text-center text-white`}>
          {t('Hover to view the phrase')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MenemonicPhrase: React.FC<{index: number; text: string}> = ({
  index,
  text,
}) => {
  return (
    <View style={tw`flex flex-row items-center gap-1 text-xs font-medium`}>
      <View style={tw`flex flex-row items-center w-4 h-6`}>
        <Text style={tw`text-grey-400`}>{index}</Text>
      </View>
      <View style={tw`rounded-2xl bg-[#4e4e4e] px-2 py-1`}>
        <Text style={tw`text-grey-50`}>{text}</Text>
      </View>
    </View>
  );
};

export default MnemonicBox;
