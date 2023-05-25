import React, {useState, useEffect, useRef, useContext} from 'react';
import axios from 'axios';
import {View, Text, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, Web23TextArea, ScreenTitle} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import {PINATA, API_SMART_ENDPOINT_URL} from 'config';

const PostMediaScreen: React.FC<{route: any}> = ({route}) => {
  const {mediaType} = route.params;
  const navigation = useWeb23Navigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [copyright, setCopyright] = useState<string>();
  const [selectedFile, setSelectedFile] = useState();
  const [mediaHash, setMediaHash] = useState<string>('');
  const [isUploading, setIsUploading] = useState<{
    state: string;
    percent: number;
  }>({state: 'pending', percent: 0});
  const progressRef = useRef<View>(null);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      allowMultiSelection: false,
    });

    const formData = new FormData();
    formData.append('file', res.uri);
    const intervalId = setInterval(() => {
      setIsUploading(prev => {
        const num = Math.random() * 30;
        if (progressRef.current)
          progressRef.current.style.width =
            prev.percent + num > 90
              ? '94%'
              : (prev.percent + num).toString() + '%';
        return {
          ...prev,
          state: 'going',
          percent:
            prev.percent + num > 90 ? 94 : Math.floor(prev.percent + num),
        };
      });
    }, 300);
    const uploadFile = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          pinata_api_key: `${PINATA.key}`,
          pinata_secret_api_key: `${PINATA.secret}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    clearInterval(intervalId);
    if (progressRef.current) progressRef.current.style.width = '100%';
    setIsUploading({state: 'going', percent: 100});
    setTimeout(() => {
      setSelectedFile(res.uri);
      setMediaHash(uploadFile.data.IpfsHash);
      setIsUploading({state: 'pending', percent: 0});
    }, 500);
  };

  return (
    <Screen loading={loading}>
      <View style={tw`h-full flex flex-col justify-between`}>
        <ScreenTitle
          title={`Post ${
            mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
          }`}
          onPress={() => navigation.navigate('SmartSetupScreen')}
        />
        <View>
          {mediaType !== 'article' && (
            <View style={tw`px-3`}>
              <View style={tw`my-4 bg-grey-900 rounded-xl`}>
                <Text
                  style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
                  Upload File
                </Text>
                <View style={tw`px-3 py-2`}>
                  {!preview ? (
                    <View
                      style={tw`p-4 border border-dashed border-grey-800 min-h-[120px] relative`}>
                      {isUploading.state !== 'pending' ? (
                        <View
                          style={tw`absolute top-0 left-0 w-full h-full bg-transparent`}>
                          <View
                            style={tw`bg-[#3C8725] w-0 h-full flex flex-row justify-center items-center transition-all  `}
                            ref={progressRef}
                          />
                          <View
                            style={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold`}>
                            <Text
                              style={tw`text-base text-grey-50 mb-2 text-center`}>
                              Uploading...
                            </Text>
                            <Text style={tw`text-xs text-white text-center`}>
                              {isUploading.percent.toString() + '%'}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <>
                          <View style={tw`flex flex-row justify-center`}>
                            <Text
                              style={tw`mt-1 mb-2 text-base font-bold text-center   text-grey-50 active:text-grey-200`}
                              onPress={() => {}}>
                              Click to upload a file
                            </Text>
                          </View>
                          <Text
                            style={tw`mb-1 text-xs font-bold text-center px-9 text-grey-600`}>
                            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM,
                            MP3, WAV, etc,. Max size: 100 MB
                          </Text>
                        </>
                      )}
                    </View>
                  ) : (
                    <View>
                      <View style={tw`flex flex-row justify-center`}>
                        {mediaType === 'photo' ? (
                          <Image
                            alt="nft"
                            source={{uri: preview}}
                            style={tw`rounded-[32px]`}
                          />
                        ) : (
                          <Image
                            alt="nft"
                            source={require('../../../assets/png/img.png')}
                            style={tw`flex flex-row rounded-[32px]`}
                          />
                        )}
                      </View>
                      <Text
                        style={tw`py-1 text-sm font-bold text-center text-white  `}
                        onPress={() => setPreview('')}>
                        Re-upload file
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
          <View style={tw.style('mx-3 pb-4 bg-grey-900 rounded-xl')}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              Basic Details
            </Text>
            <View style={tw`flex flex-col gap-4 px-3 mt-3`}>
              <Web23TextArea
                placeholder="Tell people about your photo..."
                value={desc}
                rows={8}
                onChange={e => setDesc(e)}
              />
              {mediaType !== 'article' && (
                <Web23Input
                  placeholder="Add location"
                  value={location}
                  onChange={e => setLocation(e)}
                />
              )}
              {mediaType !== 'article' && (
                <Web23Input
                  placeholder="Add copyright"
                  value={copyright}
                  onChange={e => setCopyright(e)}
                />
              )}
            </View>
          </View>
        </View>
        <View style={tw`mt-4 px-3 pb-8`}>
          <Web23Button
            text={`Post ${
              mediaType.charAt(0).toUpperCase() + mediaType.slice(1)
            }`}
            onPress={async () => {
              try {
                setLoading(true);
                await axios.post(API_SMART_ENDPOINT_URL + 'media/postMedia', {
                  user_id: currentUser.smartUid,
                  category: mediaType,
                  detail: desc,
                  location,
                  copyright,
                  content: mediaHash,
                });
                navigation.navigate('SmartSetupScreen');
                setLoading(false);
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default PostMediaScreen;
