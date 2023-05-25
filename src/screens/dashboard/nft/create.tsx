import React, {useState, useContext, useRef} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import DocumentPicker from 'react-native-document-picker';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {Screen} from 'layouts';

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
  Web23ChooseWallet,
  Web23TextArea,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';
import apiHandler from 'utils/apiHandler';
import {PINATA} from 'config';

import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';
import CollectionSVG from '../../../assets/icons/collections.svg';
import LinkSVG from '../../../assets/icons/link.svg';
import AltTextSVG from '../../../assets/icons/alt-text.svg';
import CircleCheckSVG from '../../../assets/icons/check_circle.svg';
import DeleteSVG from '../../../assets/icons/delete.svg';
import ArrowSVG from '../../../assets/icons/arrow-down.svg';
import CompleteSVG from '../../../assets/icons/complete.svg';

const CreateNFTScreen: React.FC = () => {
  const navigation = useWeb23Navigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [showSupply, setShowSupply] = useState<boolean>(false);
  const [showAdditional, setShowAdditional] = useState<boolean>(false);
  const [showAttributes, setShowAttributes] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [attributes, setAttributes] = useState<{name: string; value: string}[]>(
    [{name: '', value: ''}],
  );
  const [editAttributes, setEditAttributes] = useState<
    {name: string; value: string}[]
  >([{name: '', value: ''}]);
  const [supply, setSupply] = useState<{
    amount: string;
    mode: 'single' | 'multiple';
  }>({amount: '', mode: 'single'});
  const [more, setMore] = useState<string>('');
  const [additional, setAdditional] = useState<{
    collection: string;
    external: string;
    alternate: string;
  }>({collection: '', external: '', alternate: ''});
  const [showWalletList, setShowWalletList] = useState<boolean>(false);
  const [showNetType, setShowNetType] = useState<boolean>(false);
  const [showEditWallet, setShowEditWallet] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string>();
  const [memo, setMemo] = useState<string>('');
  const [imgHash, setImgHash] = useState<string>('');
  const [isUploading, setIsUploading] = useState<{
    state: string;
    percent: number;
  }>({state: 'pending', percent: 0});
  const progressRef = useRef<View>(null);
  const toast = useToast();

  // useEffect(() => {
  //   if (!selectedFile) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const objectUrl = URL.createObjectURL(selectedFile);
  //   setPreview(objectUrl);
  //   return () => URL.revokeObjectURL(objectUrl);
  // }, [selectedFile]);

  const onSelectFile = async () => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    const formData = new FormData();
    formData.append('file', result[0]);
    // const intervalId = setInterval(() => {
    //   setIsUploading(prev => {
    //     const num = Math.random() * 30;
    //     if (progressRef.current) {
    //       const wValue =
    //         prev.percent + num > 90
    //           ? '94%'
    //           : (prev.percent + num).toString() + '%';
    //       progressRef.current.setNativeProps({
    //         style: {
    //           backgroundColor: '#3C8725',
    //           width: wValue,
    //           height: '100%',
    //           display: 'flex',
    //           flexDirection: 'flex-row',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //         },
    //       });
    //     }
    //     return {
    //       ...prev,
    //       state: 'going',
    //       percent:
    //         prev.percent + num > 90 ? 94 : Math.floor(prev.percent + num),
    //     };
    //   });
    // }, 300);
    const uploadFile = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: `${PINATA.key}`,
          pinata_secret_api_key: `${PINATA.secret}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    //clearInterval(intervalId);
    // if (progressRef.current) {
    //   progressRef.current.setNativeProps({
    //     style: {
    //       backgroundColor: '#3C8725',
    //       width: '100%',
    //       height: '100%',
    //       display: 'flex',
    //       flexDirection: 'flex-row',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     },
    //   });
    // }
    //setIsUploading({state: 'going', percent: 100});
    setTimeout(() => {
      setPreview(result[0].fileCopyUri || '');
      setImgHash(uploadFile.data.IpfsHash);
      setIsUploading({state: 'pending', percent: 0});
    }, 500);
  };

  return (
    <>
      <Screen loading={loading}>
        <ScreenTitle
          title={t('Create NFT') || 'Create NFT'}
          onPress={() => navigation.navigate('DashboardNFTScreen')}
        />
        <View style={tw`flex justify-center h-auto h-full px-3`}>
          <View style={tw`my-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              {t('Upload File')}
            </Text>
            <View style={tw`px-3 py-2`}>
              {!preview ? (
                <View
                  style={tw`p-4 border border-dashed border-grey-800 min-h-[120px] relative`}>
                  {isUploading.state !== 'pending' ? (
                    <View
                      style={tw`absolute top-0 left-0 w-full h-full bg-transparent`}>
                      <View
                        style={tw`bg-[#3C8725] w-0 h-full flex flex-row justify-center items-center`}
                        ref={progressRef}
                      />
                      <View
                        style={tw`absolute font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}>
                        <Text
                          style={tw`mb-2 text-base text-center text-grey-50`}>
                          {t('Uploading') + '...'}
                        </Text>
                        <Text style={tw`text-xs text-center text-white`}>
                          {isUploading.percent.toString() + '%'}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <>
                      <View style={tw`flex flex-row justify-center`}>
                        <TouchableOpacity onPress={() => onSelectFile()}>
                          <Text
                            style={tw`mt-1 mb-2 text-base font-bold text-center text-grey-50 active:text-grey-200`}>
                            {t('Click to upload a file')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={tw`mb-1 text-xs font-bold text-center px-9 text-grey-600`}>
                        {t('File types supported') +
                          ': JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, etc,. ' +
                          t('Max size') +
                          ': 100 MB'}
                      </Text>
                    </>
                  )}
                </View>
              ) : (
                <View>
                  <View style={tw`flex flex-row justify-center`}>
                    <Image
                      alt="nft"
                      source={{uri: preview}}
                      style={tw`  rounded-[32px]`}
                    />
                  </View>
                  <Text
                    style={tw`py-1 text-sm font-bold text-center text-white `}
                    onPress={() => {
                      setSelectedFile(undefined);
                      setPreview('');
                    }}>
                    {t('Re-upload file')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={tw`pb-4 mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              {t('Basic Details')}
            </Text>
            <View style={tw`flex flex-col gap-4 px-3 mt-3`}>
              <Web23Input
                placeholder={t('Enter NFT Title')}
                value={title}
                className="border border-grey-800 "
                onChange={e => setTitle(e)}
              />
              <TouchableOpacity onPress={() => setShowSupply(true)}>
                <Web23Input
                  placeholder={t('Choose Supply')}
                  value={supply.amount}
                  onChange={e => setSupply({...supply, amount: e})}
                />
              </TouchableOpacity>
              <Web23TextArea
                placeholder={
                  t('Tell us more about it') || 'Tell us more about it'
                }
                value={more}
                rows={5}
                onChange={(e: any) => setMore(e)}
                className="border border-grey-800 "
              />
            </View>
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              {t('Choose Wallet')}
            </Text>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between items-center active:bg-grey-800 rounded-b-xl`}
              onPress={() => setShowWalletList(true)}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <Web23Avatar
                  name={currentUser.userName}
                  color={currentUser.themeColor}
                  type={currentUser.type}
                />
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                    {currentUser.userName}
                  </Text>
                  <Text style={tw`text-xs text-grey-400`}>
                    {currentUser.accountId}
                  </Text>
                </View>
              </View>
              <View>
                <ArrowDownSVG
                  fill="#9e9e9e"
                  style={{
                    transform: [{rotate: '-90deg'}],
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              {t('Additional Details')}
            </Text>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between items-center border-b border-b-grey-800 active:bg-grey-800`}
              onPress={() => setShowAdditional(true)}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View
                  style={tw`bg-grey-800 w-[44px] h-[44px] rounded-full flex flex-row items-center justify-center`}>
                  <CollectionSVG />
                </View>
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                    {t('Collection')}
                  </Text>
                  <Text style={tw`text-xs text-grey-400`}>
                    {additional.collection || 'Not added yet'}
                  </Text>
                </View>
              </View>
              <View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between items-center border-b border-b-grey-800 active:bg-grey-800`}
              onPress={() => setShowAdditional(true)}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View
                  style={tw`bg-grey-800 w-[44px] h-[44px] rounded-full flex flex-row items-center justify-center`}>
                  <LinkSVG fill="#FFCE0A" />
                </View>
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                    {t('External Link')}
                  </Text>
                  <Text style={tw`text-xs text-grey-400`}>
                    {additional.external || t('Not added yet')}
                  </Text>
                </View>
              </View>
              <View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-3 py-[10px] flex flex-row justify-between items-center rounded-b-xl active:bg-grey-800`}
              onPress={() => setShowAdditional(true)}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View
                  style={tw`bg-grey-800 w-[44px] h-[44px] rounded-full flex flex-row items-center justify-center`}>
                  <AltTextSVG />
                </View>
                <View style={tw`py-1 font-bold`}>
                  <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                    {t('Alternate Text')}
                  </Text>
                  <Text style={tw`text-xs text-grey-400`}>
                    {additional.alternate || t('Not added yet')}
                  </Text>
                </View>
              </View>
              <View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-4 bg-grey-900 rounded-xl`}>
            <Text
              style={tw`pt-[18px] pb-[2px] px-3 text-grey-200 font-bold text-sm`}>
              {t('Attributes')}
            </Text>
            <View style={tw`p-4 font-bold border-b border-b-grey-800`}>
              {attributes.length > 0 &&
              attributes[attributes.length - 1].name !== '' &&
              attributes[attributes.length - 1].value !== '' ? (
                <View style={tw`flex flex-row flex-wrap w-full gap-2`}>
                  {attributes.map((item, index) => (
                    <View
                      style={tw`p-3 border border-white border-opacity-30`}
                      key={`Show_Attributes_${index}`}>
                      <Text style={tw`mb-1 text-xs font-bold text-grey-400`}>
                        {item.name}
                      </Text>
                      <Text style={tw`text-base font-medium text-white`}>
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <>
                  <Text
                    style={tw`mt-1 mb-2 text-base text-center text-grey-50`}>
                    {t('Not added yet')}
                  </Text>
                  <Text
                    style={tw`px-10 mb-1 text-xs text-center text-grey-600`}>
                    {t('Add attributes and their respective percentages')}
                  </Text>
                </>
              )}
            </View>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-between p-4 rounded-b-xl active:bg-grey-800`}
              onPress={() => {
                setEditAttributes(attributes);
                setShowAttributes(true);
              }}>
              <Text style={tw`text-base font-bold text-white`}>
                {t('Add Attributes')}
              </Text>
              <View>
                <ArrowDownSVG
                  style={{transform: [{rotate: '-90deg'}]}}
                  fill="#9E9E9E"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`mb-8`}>
            <Web23Button
              size="sm"
              text={t('Continue') || 'Continue'}
              onPress={() => {
                if (
                  title === '' ||
                  !supply ||
                  more === '' ||
                  additional.collection === '' ||
                  additional.external === '' ||
                  additional.alternate === '' ||
                  attributes.length === 0 ||
                  imgHash === ''
                ) {
                  toast.show(t('Invalid Operation') || '');
                } else {
                  setShowReview(true);
                }
              }}
            />
          </View>
        </View>
      </Screen>
      <Web23Popup
        title={t('Choose Supply') || 'Choose Supply'}
        show={showSupply}
        setShow={setShowSupply}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between border-b border-b-grey-800 active:bg-grey-800 rounded-t-xl`}
            onPress={() => setSupply({...supply, mode: 'single'})}>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                {t('Unique')}
              </Text>
              <Text style={tw`text-xs text-grey-400`}>{t('Single')}</Text>
            </View>
            {supply.mode === 'single' && (
              <View>
                <CircleCheckSVG fill="#D7FC51" />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between active:bg-grey-800 rounded-b-xl`}
            onPress={() => setSupply({...supply, mode: 'multiple'})}>
            <View style={tw`py-1 font-bold`}>
              <Text style={tw`text-base text-grey-50 mb-[2px]`}>
                {t('Multiple')}
              </Text>
              <Text style={tw`text-xs text-grey-400`}>
                {t('Multiple copies')}
              </Text>
            </View>
            {supply.mode === 'multiple' && (
              <View>
                <CircleCheckSVG fill="#D7FC51" />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Additional Details') || 'Additional Details'}
        show={showAdditional}
        setShow={setShowAdditional}>
        <View
          style={tw`flex flex-col gap-4 px-3 py-4 my-4 mb-8 bg-grey-900 rounded-xl`}>
          <Web23Input
            placeholder={t('Enter Collection Name')}
            value={additional.collection}
            onChange={e => setAdditional({...additional, collection: e})}
          />
          <View style={tw`relative`}>
            <Web23Input
              placeholder="External Link"
              className="pr-[60px]"
              value={additional.external}
              onChange={e => setAdditional({...additional, external: e})}
            />
            <Text
              style={tw`  absolute text-sm font-medium -translate-y-1/2 right-5 top-[24px] text-lime-500 active:text-green-500`}
              onPress={async () => {
                // const data = await navigator.clipboard.readText();
                const data = await Clipboard.getString();
                setAdditional({
                  ...additional,
                  external: data,
                });
              }}>
              {t('PASTE')}
            </Text>
          </View>
          <Web23Input
            placeholder="Alternate Text"
            value={additional.alternate}
            onChange={(e: any) => setAdditional({...additional, alternate: e})}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Attributes') || 'Attributes'}
        show={showAttributes}
        setShow={setShowAttributes}>
        {editAttributes.map((item, index) => (
          <View
            style={tw`py-4 my-4 bg-grey-900 rounded-xl`}
            key={`Attributes_${index}`}>
            <View
              style={tw`flex flex-row items-center justify-between px-5 pb-3`}>
              <Text style={tw`text-sm font-bold text-grey-200`}>
                {t('Attribute') + (index + 1)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setEditAttributes(prev =>
                    prev.filter((_, idx) => idx === 0 || index !== idx),
                  );
                }}>
                <DeleteSVG fill="#FF0A22" />
              </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row gap-4 px-3`}>
              <View>
                <Web23Input
                  placeholder={t('Name')}
                  value={editAttributes[index].name}
                  onChange={(e: any) => {
                    const newAttributes = [...editAttributes];
                    newAttributes[index].name = e;
                    setEditAttributes(newAttributes);
                  }}
                />
              </View>
              <Web23Input
                placeholder={t('Value')}
                value={editAttributes[index].value}
                onChange={(e: any) => {
                  const newAttributes = [...editAttributes];
                  newAttributes[index].value = e;
                  setEditAttributes(newAttributes);
                }}
              />
            </View>
          </View>
        ))}
        <View style={tw`flex flex-col gap-4 mb-8`}>
          <Web23Button
            text={t('Add another') || 'Add another'}
            size="sm"
            variant="third"
            onPress={() =>
              setEditAttributes(prev => prev.concat({name: '', value: ''}))
            }
          />
          <Web23Button
            text={t('Save') || 'Save'}
            size="sm"
            onPress={() => {
              const resAttribute = editAttributes.filter(
                item => item.name !== '' && item.value !== '',
              );
              setAttributes(resAttribute);
              setShowAttributes(false);
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Review NFT Creation') || 'Review NFT Creation'}
        show={showReview}
        setShow={setShowReview}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`pt-[18px] px-3 pb-[2px] font-bold text-sm text-grey-200`}>
            {t('Creating')}
          </Text>
          <View
            style={tw`px-3 py-[10px] border-b border-b-grey-800 flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 bg-grey-800`}>
              <Image source={{uri: preview}} alt="nft preview" />
            </View>
            <View style={tw`py-[2px] font-bold`}>
              <Text style={tw`mb-1 text-base text-grey-50`}>{title}</Text>
              <Text style={tw`text-xs text-grey-400`}>
                {currentUser.accountId}
              </Text>
            </View>
          </View>
          <View
            style={tw`px-3 py-[10px] rounded-b-xl flex flex-row gap-3 items-center`}>
            <Web23Avatar
              name={currentUser.userName}
              color={currentUser.themeColor}
              size="sm"
              type={currentUser.type}
            />
            <View style={tw`py-[2px] font-bold`}>
              <Text style={tw`mb-1 text-base text-grey-50`}>
                {currentUser.userName}
              </Text>
              <Text style={tw`text-xs text-grey-400`}>
                {currentUser.accountId}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex flex-col gap-4 mb-8`}>
          <Web23Input
            placeholder={t('Add Memo (optional)')}
            value={memo}
            onChange={e => setMemo(e)}
          />
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 text-sm font-bold border border-grey-800 rounded-xl text-grey-200`}>
            <Text>{t('Transaction Fees')}</Text>
            <View style={tw`flex flex-row items-center gap-4`}>
              <Text>ℏ0.5</Text>
              <ArrowSVG style={tw`rotate-180`} fill="#9e9e9e" />
            </View>
          </View>
          <Web23Button
            text={t('Confirm NFT creation') || 'Confirm NFT creation'}
            onPress={async () => {
              try {
                setLoading(true);
                setShowReview(false);

                const data = {
                  name: title,
                  img: 'ipfs://' + imgHash,
                  description: more,
                  collection: additional.collection,
                  external_link: additional.external,
                  alternate_text: additional.alternate,
                  attribute: attributes,
                };

                const config = {
                  method: 'post',
                  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                  maxBodyLength: Infinity,
                  headers: {
                    'Content-Type': 'application/json',
                    pinata_api_key: `${PINATA.key}`,
                    pinata_secret_api_key: `${PINATA.secret}`,
                  },
                  data: data,
                };

                const meta = await axios(config);

                await apiHandler('create_nft', currentUser.token, {
                  accountId: currentUser.accountId,
                  net: currentUser.net,
                  memo,
                  priv: currentUser.privKey,
                  tokenName: title,
                  ipfsHash: meta.data.IpfsHash,
                });

                setLoading(false);
                setShowSuccess(true);

                setSelectedFile(undefined);
                setPreview('');
                setTitle('');
                setSupply({amount: '', mode: 'single'});
                setAdditional({alternate: '', collection: '', external: ''});
                setMore('');
              } catch (e) {
                setLoading(false);
              }
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Transaction Initiated') || 'Transaction Initiated'}
        show={showSuccess}
        setShow={setShowSuccess}>
        <View style={tw`flex flex-row justify-center mt-4 mb-3`}>
          <CompleteSVG />
        </View>
        <Text style={tw`mb-8 text-base font-medium text-center text-grey-200`}>
          {t(
            'Your transaction is initiated and will go through in a few minutes. We shall keep you updated.',
          )}
        </Text>
      </Web23Popup>

      <Web23ChooseWallet
        setShowEditWallet={setShowEditWallet}
        setShowNetType={setShowNetType}
        setShowWalletList={setShowWalletList}
        showEditWallet={showEditWallet}
        showNetType={showNetType}
        showWalletList={showWalletList}
      />

      {/* {ToasterBox}     */}
    </>
  );
};

export default CreateNFTScreen;
