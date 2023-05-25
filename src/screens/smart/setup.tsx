import React, {useState, useContext, useEffect} from 'react';
import {FlatList, View, Image, TouchableOpacity, Text} from 'react-native';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import DocumentPicker from 'react-native-document-picker';
import {useToast} from 'react-native-toast-notifications';
import Clipboard from '@react-native-clipboard/clipboard';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, Web23Popup, Web23TextArea} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import apiHandler from 'utils/apiHandler';
import tw from 'utils/tailwind';

import {API_SMART_ENDPOINT_URL, PINATA} from 'config';

import ArrowBackSVG from '../../assets/icons/arrow_back.svg';
import MoreSVG from '../../assets/icons/more_horiz.svg';
import ContentCopySVG from '../../assets/icons/content_copy.svg';
import AddSVG from '../../assets/icons/add.svg';
import DesktopSVG from '../../assets/icons/desktop_windows.svg';
import LaunchSVG from '../../assets/icons/launch.svg';
import ArrowSVG from '../../assets/icons/arrow-down.svg';
import PhotoSVG from '../../assets/icons/photo.svg';
import AccountSVG from '../../assets/icons/account_circle.svg';
import PinSVG from '../../assets/icons/pin_drop.svg';
import TextSVG from '../../assets/icons/text_snippet.svg';
import LinkSVG from '../../assets/icons/link.svg';
import TwitterSVG from '../../assets/icons/TwitterLogo.svg';
import DeleteSVG from '../../assets/icons/delete.svg';
import InstagramSVG from '../../assets/icons/InstagramLogo.svg';
import NFTSVG from '../../assets/icons/NFTs.svg';
import PhotoRedSVG from '../../assets/icons/photo_red.svg';
import AudioTrackSVG from '../../assets/icons/audiotrack.svg';
import VideoSVG from '../../assets/icons/videocam.svg';
import ArticleSVG from '../../assets/icons/article.svg';
import TrendingUpSVG from '../../assets/icons/trending_up.svg';
import TokenMarkSVG from '../../assets/icons/token_mark.svg';
import LocalOfferSVG from '../../assets/icons/local_offer.svg';
import LocalCafeSVG from '../../assets/icons/local_cafe.svg';
import LoupeSVG from '../../assets/icons/loupe.svg';
import GiftSVG from '../../assets/icons/card_giftcard.svg';
import CircleCheckSVG from '../../assets/icons/check_circle.svg';

type IProfileLink = {
  twitter: string;
  facebook: string;
  instagram: string;
  customLink: string[];
};

const SmartSetupScreen: React.FC<{route: any}> = ({route}) => {
  const {initialTab = 0} = route.params;
  const navigation = useWeb23Navigation();
  const [showOption, setShowOption] = useState<boolean>(false);
  const [showLocation, setShowLocation] = useState<boolean>(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [intro, setIntro] = useState<string>('');
  const [customLink, setCustomLink] = useState<string[]>(['']);
  const [countNFT, setCountNFT] = useState<number>(0);
  const [profileLink, setProfileLink] = useState<IProfileLink>({
    twitter: '',
    facebook: '',
    instagram: '',
    customLink: [],
  });
  const [twitterLink, setTwitterLink] = useState<string>('');
  const [instagramLink, setInstagramLink] = useState<string>('');
  const [facebookLink, setFacebookLink] = useState<string>('');
  const [showPost, setShowPost] = useState<boolean>(false);
  const [showPostNFT, setShowPostNFT] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(initialTab);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);
  const [showCoupon, setShowCoupon] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>('');
  const [couponType, setCouponType] = useState<boolean>(false);
  const [showDonation, setShowDonation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [bannerImg, setBannerImg] = useState<string>('');
  const [avatarImg, setAvatarImg] = useState<string>('');
  const [domain, setDomain] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const {t} = useTranslation();
  const toast = useToast();

  const [nfts, setNFTs] = useState<
    {
      nft: {
        name: string;
        description: string;
        creator: string;
        category: string;
        img: string;
        token: string;
        attribute: string[];
        external_link: string;
        collection: string;
        alternate_text: string;
      }[];
      type: string;
    }[]
  >([]);
  const [media, setMedia] = useState<
    {
      category: string;
      img: string;
      description: string;
      location: string;
      copyright: string;
    }[]
  >();
  const [socialToken, setSocialToken] = useState<{
    amount: number;
    name: string;
    value: number;
    tokenId: string;
  }>({amount: 0, name: '', value: 5, tokenId: ''});

  const asyncOperation = async () => {
    try {
      setLoading(true);
      const {nfts} = await apiHandler('get_nfts', currentUser.token, {
        accountId: currentUser.accountId,
        //accountId: "0.0.1680808",
        net: true,
      });

      let count = 0;
      const resNFT = await Promise.all(
        nfts.map(async (nft: any) => {
          const bin = await Promise.all(
            nft.metaData.map(async (ipfs: any) => {
              count++;
              const binData = await axios(`https://ipfs.io/ipfs/${ipfs.meta}`);
              return {
                ...binData.data,
                img: 'https://ipfs.io/ipfs/' + binData.data.image.slice(7),
                token: ipfs.token,
              };
            }),
          );
          return {type: nft.type, nft: bin};
        }),
      );
      setCountNFT(count);
      setNFTs(resNFT);
    } catch (e) {
      setLoading(false);
    }

    try {
      const data = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + 'socialToken/' + currentUser.smartUid,
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (data?.data) setSocialToken(data.data.data);
    } catch (e) {
      setLoading(false);
    }

    try {
      const mediaResponse = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + 'media/getMedia',
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (mediaResponse?.data?.data) {
        setMedia(
          mediaResponse?.data?.data.map((item: any) => ({
            category: item.category,
            img: 'https://ipfs.io/ipfs/' + item.content,
            description: item.detail,
            location: item.location,
            copyright: item.copyright,
          })),
        );
      }
    } catch (e) {
      setLoading(false);
    }

    try {
      const userDetail = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + 'account',
        data: {
          user_id: currentUser.smartUid,
        },
      });
      if (userDetail?.data?.data) {
        setDomain(userDetail?.data?.data.domainName);
        setDisplayName(userDetail?.data?.data.displayName);
      }
    } catch (e) {
      setLoading(false);
    }

    try {
      const userAccount = await axios.post(
        API_SMART_ENDPOINT_URL + `account/getAccount`,
        {
          user_id: currentUser.smartUid,
        },
      );

      if (userAccount?.data?.data?.coverImageURL.length > 0)
        setBannerImg(
          'https://ipfs.io/ipfs/' + userAccount?.data?.data?.coverImageURL,
        );
      if (userAccount?.data?.data?.profileImageURL.length > 0)
        setAvatarImg(
          'https://ipfs.io/ipfs/' + userAccount?.data?.data?.profileImageURL,
        );
    } catch (e) {
      setLoading(false);
    }

    try {
      const userProfile = await axios({
        method: 'post',
        url: API_SMART_ENDPOINT_URL + `account/getProfile`,
        data: {
          user_id: currentUser.smartUid,
        },
      });

      if (userProfile?.data?.data) {
        setLocation(userProfile?.data?.data?.location);
        setIntro(userProfile?.data?.data?.introduction);
        setCustomLink(userProfile?.data?.data?.links);
        setTwitterLink(userProfile?.data?.data?.twitter);
        setInstagramLink(userProfile?.data?.data?.website);
        setProfileLink({
          customLink: userProfile?.data?.data.links,
          twitter: userProfile?.data?.data.twitter,
          instagram: userProfile?.data?.data.website,
          facebook: '',
        });
      }
    } catch (e) {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    asyncOperation();
  }, [currentUser]);

  const onSelectBannerFile = async () => {
    setLoading(true);
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      allowMultiSelection: false,
    });

    setBannerImg(res[0].uri);

    const formData = new FormData();
    formData.append('file', res);

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

    await axios({
      method: 'post',
      url: API_SMART_ENDPOINT_URL + '/account/editImage',
      data: {
        user_id: currentUser.smartUid,
        coverImage: uploadFile.data.IpfsHash,
      },
    });

    setLoading(false);
  };

  const onSelectAvatarFile = async () => {
    setLoading(true);
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });

    setAvatarImg(res[0].uri);

    const formData = new FormData();
    formData.append('file', res);

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

    const data = await axios({
      method: 'post',
      url: API_SMART_ENDPOINT_URL + '/account/editImage',
      data: {
        user_id: currentUser.smartUid,
        profileImage: uploadFile.data.IpfsHash,
      },
    });

    setLoading(false);
  };

  return (
    <>
      <Screen loading={loading}>
        <View>
          <View
            style={tw`px-6 pt-5 pb-[76px] bg-blue-900 relative flex flex-col`}>
            {bannerImg && (
              <Image
                source={{uri: bannerImg}}
                alt="banner"
                style={tw`absolute top-0 left-0 w-full h-full`}
              />
            )}

            <View style={tw`absolute z-10 top-5 left-6`}>
              <ArrowBackSVG
                fill="#D6D6D6"
                onPress={() => navigation.navigate('LoginSmartScreen')}
              />
            </View>
            <View
              style={tw`w-[72px] h-[72px] bg-gradient-to-b from-[#70B7FF] to-[#68FFA1] rounded-full absolute -bottom-[36px]`}>
              {avatarImg && (
                <Image
                  source={{uri: avatarImg}}
                  alt="avatar"
                  style={tw`rounded-full`}
                />
              )}
            </View>
          </View>
          <View style={tw`flex flex-row justify-end px-6 pt-1 pb-2`}>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-8 h-8 rounded-full bg-grey-900`}
              onPress={() => setShowOption(true)}>
              <MoreSVG fill="#F4F4F4" />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row justify-between px-6 mb-4`}>
            <View>
              <Text style={tw`mb-2 text-base font-bold text-grey-50`}>
                {domain}
                <Text style={tw`text-sm text-grey-200`}>
                  {'  ' + displayName}
                </Text>
              </Text>
              {intro.length > 0 ? (
                <Text
                  style={tw`font-medium text-xs text-grey-400 w-[163px]   mb-2 line-clamp-3`}>
                  {intro}
                </Text>
              ) : (
                <Text
                  style={tw`mb-2 text-sm font-medium underline text-grey-400 active:text-grey-600`}
                  onPress={() => setShowLocation(true)}>
                  {t('Let’s add an intro here')}
                </Text>
              )}
              {location.length > 0 && (
                <View style={tw`flex flex-row items-center gap-1 mb-2`}>
                  <View>
                    <PinSVG fill="#9E9E9E" />
                  </View>
                  <Text style={tw`text-xs font-medium text-grey-400`}>
                    {location}
                  </Text>
                </View>
              )}

              <View
                style={tw`w-[118px] flex flex-row gap-1 items-center px-3 py-2 rounded-3xl bg-grey-900`}>
                <Text style={tw`text-xs font-bold text-grey-50`}>
                  {currentUser.accountId}
                </Text>
                <ContentCopySVG
                  fill="#F4F4F4"
                  onPress={() => {
                    Clipboard.setString(currentUser.accountId);
                    toast.show(t('Successfully copied') || '');
                  }}
                />
              </View>
            </View>
            <View>
              <View style={tw`max-h-[72px]  `}>
                {profileLink.customLink.map((item, idx) => (
                  <View
                    key={item + idx}
                    style={tw`flex flex-row items-center gap-1`}>
                    <View>
                      <LinkSVG fill="#FFFFFF" />
                    </View>
                    <Text
                      style={tw`font-bold text-xs text-white max-w-[60px] truncate overflow-hidden`}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={tw`flex flex-row items-center justify-center gap-3`}>
                {profileLink.instagram && (
                  <View>
                    <InstagramSVG fill="#FFFFFF" />
                  </View>
                )}
                {profileLink.twitter && (
                  <View>
                    <TwitterSVG
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                      style={tw`text-white`}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={tw`flex flex-row gap-4 px-6 text-sm border-b border-grey-900`}>
            <TouchableOpacity
              style={tw.style(
                'flex flex-row items-center pb-2 gap-1 border-b',
                tab === 0 ? 'border-white' : 'border-transparent',
              )}
              onPress={() => setTab(0)}>
              <Text style={tw`font-bold text-white`}>{t('Timeline')}</Text>
              <Text style={tw`font-medium text-grey-400`}>{countNFT}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'flex flex-row pb-2 items-center gap-1 border-b',
                tab === 1 ? 'border-white' : 'border-transparent',
              )}
              onPress={() => setTab(1)}>
              <Text style={tw`font-bold text-white`}>{t('Market')}</Text>
              <Text style={tw`font-medium text-grey-400`}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'flex flex-row pb-2 items-center gap-1 border-b',
                tab === 2 ? 'border-white' : 'border-transparent',
              )}
              onPress={() => setTab(2)}>
              <Text style={tw`font-bold text-white`}>{t('Tokens')}</Text>
              <View
                style={tw`px-1 py-[2px] flex flex-row gap-[2px] items-center rounded-[4px] bg-yellow-500`}>
                <TrendingUpSVG />
                <Text style={tw`text-xs font-bold`}>{t('New')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {tab === 0 && (
            <View style={tw`mt-4`}>
              {nfts.map((it, idx) => (
                <FlatList
                  columnWrapperStyle={tw`justify-between`}
                  numColumns={3}
                  data={it.nft}
                  ItemSeparatorComponent={() => <View style={tw`h-2`} />}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={`${idx}_${index}`}
                      onPress={() =>
                        navigation.navigate('DetailPostViewScreen', {
                          img: item.img,
                          tokenId: item.token,
                          name: item.name,
                          description: item.description,
                          category: item.category,
                          attribute: item.attribute,
                          external_link: item.external_link,
                          collection: item.collection,
                          alternate_text: item.alternate_text,
                        })
                      }>
                      <Image source={{uri: item.img}} alt={item.name} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => item + '___' + index}
                />
              ))}
              <FlatList
                columnWrapperStyle={tw`justify-between`}
                numColumns={3}
                data={media}
                ItemSeparatorComponent={() => <View style={tw`h-2`} />}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={`${item.category}_${index}`}
                    onPress={() =>
                      navigation.navigate('DetailPostViewScreen', {
                        img: item.img,
                        tokenId: '',
                        name: item.copyright,
                        description: item.description,
                        category: item.category,
                        attribute: [{location: item.location}],
                        external_link: '',
                        collection: '',
                        alternate_text: '',
                      })
                    }>
                    {item.category === 'photo' ? (
                      <Image
                        source={{
                          uri: item.category === 'photo' ? item.img : mediaImg,
                        }}
                        alt={item.copyright}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/png/img.png')}
                        alt={item.copyright}
                      />
                    )}
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item + '___' + index}
              />
            </View>
          )}
          {tab === 2 &&
            (currentUser.smart ? (
              <View style={tw`px-6 pb-8`}>
                <View style={tw`mt-4 mb-6`}>
                  <View
                    style={tw`relative p-4 mb-6 overflow-hidden bg-indigo-800 border border-indigo-300 rounded-xl`}>
                    <View
                      style={tw`flex flex-row items-end justify-between mb-2`}>
                      <Text style={tw`text-sm font-bold text-white opacity-70`}>
                        {socialToken.name}
                      </Text>
                      <View>
                        <Image
                          source={require('../../assets/png/perks.png')}
                          alt="perks"
                        />
                      </View>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between`}>
                      <View>
                        <Text style={tw`font-black text-white text-[48px]`}>
                          {socialToken.amount}
                        </Text>
                        <Text style={tw`mb-4 text-base font-bold text-white`}>
                          {t('Tokens')}
                        </Text>
                        <Text
                          style={tw`text-xs font-bold text-white opacity-50`}>
                          {t('Per token') + ': '}
                          {socialToken.value}
                        </Text>
                      </View>
                      <Text
                        style={tw`text-xs font-bold text-white opacity-50 [writing-mode:vertical-lr]`}>
                        {currentUser.userName}
                      </Text>
                    </View>
                    <Text
                      style={tw`absolute top-[96px] left-[-36px] font-black text-white opacity-10 text-[120px]`}>
                      {socialToken.name}
                    </Text>
                  </View>
                </View>
                <View style={tw`mb-6 bg-grey-900 rounded-xl`}>
                  <TouchableOpacity
                    style={tw`flex flex-row items-center gap-3 px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl`}
                    onPress={() => setShowCoupon(true)}>
                    <View>
                      <View
                        style={tw`flex flex-row items-center justify-center bg-green-400 rounded-full w-9 h-9`}>
                        <LocalOfferSVG fill="#0A0939" />
                      </View>
                    </View>
                    <View>
                      <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                        {t('Coupons')}
                      </Text>
                      <Text style={tw`text-sm font-bold text-grey-400`}>
                        {t('Fans can claim 1 free token')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`flex flex-row items-center gap-3 px-3 py-4 active:bg-grey-800 rounded-b-xl`}
                    onPress={() => setShowDonation(true)}>
                    <View>
                      <View
                        style={tw`flex flex-row items-center justify-center bg-purple-300 rounded-full w-9 h-9`}>
                        <LocalCafeSVG fill="#0A0939" />
                      </View>
                    </View>
                    <View>
                      <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                        {t('Donations')}
                      </Text>
                      <Text style={tw`text-sm font-bold text-grey-400`}>
                        {t('Fans can donate you any amount')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={tw`flex flex-row gap-4`}>
                  <Web23Button
                    text={t('Top-Up') || 'Top-Up'}
                    size="sm"
                    iconPosition="left"
                    icon={<LoupeSVG />}
                    onPress={() =>
                      navigation.navigate('TopUpBalanceScreen', {
                        name: socialToken.name,
                        value: socialToken.value,
                        amount: socialToken.amount,
                        tokenId: socialToken.tokenId,
                      })
                    }
                  />
                  <Web23Button
                    text={t('Gift') || 'Gift'}
                    size="sm"
                    variant="secondary"
                    icon={<GiftSVG />}
                    iconPosition="left"
                    onPress={() =>
                      navigation.navigate('GiftTokenScreen', {
                        name: socialToken.name,
                        value: socialToken.value,
                        amount: socialToken.amount,
                        tokenId: socialToken.tokenId,
                      })
                    }
                  />
                </View>
              </View>
            ) : (
              <View style={tw`px-6 pb-8`}>
                <View style={tw`py-6 mt-4 mb-3 bg-grey-900 rounded-xl`}>
                  <View style={tw`flex flex-row justify-center mb-2`}>
                    <TokenMarkSVG />
                  </View>
                  <Text
                    style={tw`mb-1 text-base font-bold text-center text-white px-11`}>
                    {t('Setup your token and build your own economy in Web23')}
                  </Text>
                  <Text
                    style={tw`px-5 text-sm font-bold text-center text-grey-400`}>
                    {t(
                      'Create your unique token and reward your fans and followers with them',
                    )}
                  </Text>
                </View>
                <Web23Button
                  text={t('Setup Social Tokens') || 'Setup Social Tokens'}
                  size="sm"
                  icon={<ArrowBackSVG style={tw`rotate-180`} fill="#212121" />}
                  onPress={() => navigation.navigate('SetupSocialTokenScreen')}
                />
              </View>
            ))}
        </View>
        {tab === 0 && (
          <View style={tw`flex-1`}>
            <TouchableOpacity
              style={tw`absolute bottom-[48px] right-6 w-[48px] h-[48px] rounded-full bg-lime-500 border border-grey-900 flex flex-row justify-center items-center active:bg-green-500`}
              onPress={() => setShowPost(true)}>
              <AddSVG />
            </TouchableOpacity>
          </View>
        )}
      </Screen>
      <Web23Popup title="Options" show={showOption} setShow={setShowOption}>
        <View style={tw`pb-4 mt-4 bg-grey-900 rounded-xl`}>
          <Text style={tw`px-3 pt-4 text-sm font-bold text-grey-200`}>
            {t('General')}
          </Text>
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 px-3 py-4 border-b border-grey-800 active:bg-grey-800`}
            onPress={() => {
              // navigator.clipboard.writeText(
              //   'http://147.182.216.70:3000/onboarding',
              // );
              // showToast(t('Copied to clipboard'));
              toast.show(t('Copied to clipboard') || '');
            }}>
            <ContentCopySVG fill="#9E9E9E" />
            <Text style={tw`text-base font-bold text-grey-50`}>
              {t('Copy Profile URL')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 rounded-b-xl active:bg-grey-800`}
            onPress={() => {
              // chrome.tabs.create({
              //   url: 'http://147.182.216.70:3000/onboarding',
              // });
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <DesktopSVG />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Open on Desktop')}
              </Text>
            </View>
            <LaunchSVG />
          </TouchableOpacity>
        </View>
        <View style={tw`mb-8 rounded-xl bg-grey-900`}>
          <Text style={tw`px-3 pt-4 text-sm font-bold text-grey-200`}>
            {t('Edit Profile')}
          </Text>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800`}
            onPress={() => {
              setShowOption(false);
              onSelectBannerFile();
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <PhotoSVG />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Edit Cover Photo')}
              </Text>
            </View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800`}
            onPress={() => {
              setShowOption(false);
              onSelectAvatarFile();
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <AccountSVG />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Edit Profile Picture')}
              </Text>
            </View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800`}
            onPress={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLocation(true);
              }, 300);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <PinSVG />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Edit Location')}
              </Text>
            </View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800`}
            onPress={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLocation(true);
              }, 300);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <TextSVG />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Edit Intro')}
              </Text>
            </View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 rounded-b-xl active:bg-grey-800`}
            onPress={() => {
              setTimeout(() => {
                setShowOption(false);
                setShowLink(true);
              }, 300);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <LinkSVG fill="#9E9E9E" />
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Manage Links')}
              </Text>
            </View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Edit Profile Details') || 'Edit Profile Details'}
        show={showLocation}
        setShow={setShowLocation}>
        <View style={tw`px-3 pb-4 mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <Text style={tw`pt-[18px] pb-[2px] text-grey-200 font-bold text-sm`}>
            {t('Profile Details')}
          </Text>
          <View style={tw`mt-3 mb-4`}>
            <Web23Input
              placeholder={t('Enter Location')}
              value={location}
              onChange={e => setLocation(e)}
            />
          </View>
          <Web23TextArea
            placeholder="Tell us more about yourself (Intro)"
            value={intro}
            rows={5}
            onChange={e => setIntro(e)}
          />
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text={t('Save Profile') || 'Save Profile'}
            size="sm"
            disabled={location.length === 0 || intro.length === 0}
            onPress={async () => {
              setShowLocation(false);
              await axios({
                method: 'post',
                url: API_SMART_ENDPOINT_URL + '/account/editIntro',
                data: {
                  user_id: currentUser.smartUid,
                  introduction: intro,
                  location: location,
                },
              });
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Manage Links') || 'Manage Links'}
        show={showLink}
        setShow={setShowLink}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <Text style={tw`px-3 pt-4 text-sm font-bold text-grey-200`}>
            {t('Social Networks')}
          </Text>
          <View style={tw`flex flex-col gap-4 pb-4 mb-4`}>
            <View style={tw`flex flex-row items-center justify-between px-3`}>
              <Text style={tw`text-base font-bold text-grey-400`}>
                twitter.com/
              </Text>
              <View style={tw`w-[164px]`}>
                <Web23Input
                  placeholder="add here"
                  value={twitterLink}
                  onChange={e => setTwitterLink(e)}
                />
              </View>
            </View>
            <View style={tw`flex flex-row items-center justify-between px-3`}>
              <Text style={tw`text-base font-bold text-grey-400`}>
                facebook.com/
              </Text>
              <View style={tw`w-[164px]`}>
                <Web23Input
                  placeholder={t('add here')}
                  value={facebookLink}
                  onChange={e => setFacebookLink(e)}
                />
              </View>
            </View>
            <View style={tw`flex flex-row items-center justify-between px-3`}>
              <Text style={tw`text-base font-bold text-grey-400`}>
                instagram.com/
              </Text>
              <View style={tw`w-[164px]`}>
                <Web23Input
                  placeholder={t('add here')}
                  value={instagramLink}
                  onChange={e => setInstagramLink(e)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={tw`px-3 pb-4 mb-4 bg-grey-900 rounded-xl`}>
          <View
            style={tw`flex flex-row justify-between items-center pt-4 mb-[14px]`}>
            <Text style={tw`text-sm font-bold text-grey-200`}>
              {t('Add Custom Link')}
            </Text>
            <DeleteSVG
              fill="#FF0A22"
              onPress={() => {
                if (customLink.length > 1) setCustomLink(prev => prev.slice(1));
              }}
            />
          </View>
          <View style={tw`flex flex-col gap-4`}>
            {customLink.map((custom, index) => (
              <View key={index}>
                <Web23Input
                  placeholder={t('Add here')}
                  value={custom}
                  onChange={e => {
                    setCustomLink(prev =>
                      prev.map((item, idx) => {
                        if (idx === index) return e;
                        else return item;
                      }),
                    );
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={tw`flex flex-col gap-4 mb-8`}>
          <Web23Button
            size="sm"
            variant="third"
            text={t('Add another link') || 'Add another link'}
            onPress={() => setCustomLink(prev => prev.concat(''))}
          />
          <Web23Button
            size="sm"
            text={t('Save') || 'Save'}
            onPress={async () => {
              setCustomLink(prev => prev.filter(item => item.length));
              setProfileLink({
                twitter: twitterLink,
                facebook: facebookLink,
                customLink: customLink.filter(item => item.length),
                instagram: instagramLink,
              });
              setShowLink(false);

              await axios({
                method: 'post',
                url: API_SMART_ENDPOINT_URL + '/account/editIntro',
                data: {
                  user_id: currentUser.smartUid,
                  website: instagramLink,
                  twitter: twitterLink,
                  links: customLink.filter(item => item.length),
                },
              });
            }}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Post') || 'Post'}
        show={showPost}
        setShow={setShowPost}>
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-between p-3 mt-4 mb-4 bg-grey-900 rounded-xl active:bg-grey-800`}
          onPress={() => {
            setShowPost(false);
            setShowPostNFT(true);
          }}>
          <View style={tw`flex flex-row items-center gap-3`}>
            <View>
              <NFTSVG
                fill="transparent"
                stroke="#D7FC51"
                style={tw`text-lime-500`}
              />
            </View>
            <View>
              <Text style={tw`text-lime-500 font-bold text-xl py-[2px]`}>
                NFT
              </Text>
              <Text style={tw`text-xs font-bold text-grey-50`}>
                {t('Add from wallet or Mint New')}
              </Text>
            </View>
          </View>
          <View>
            <ArrowSVG
              style={{transform: [{rotate: '-90deg'}]}}
              fill="#9E9E9E"
            />
          </View>
        </TouchableOpacity>
        <View style={tw`mb-8`}>
          <View
            style={tw`flex flex-row justify-around px-2 py-3 border border-yellow-600 rounded-xl`}>
            <TouchableOpacity
              onPress={() => {
                setShowPost(false);
                setTimeout(
                  () =>
                    navigation.navigate('PostMediaScreen', {
                      mediaType: 'photo',
                    }),
                  300,
                );
              }}>
              <View style={tw`flex justify-center mb-2`}>
                <PhotoRedSVG />
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Photo')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPost(false);
                setTimeout(
                  () =>
                    navigation.navigate('PostMediaScreen', {
                      mediaType: 'audio',
                    }),
                  300,
                );
              }}>
              <View style={tw`flex justify-center mb-2`}>
                <AudioTrackSVG />
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Audio')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPost(false);
                setTimeout(
                  () =>
                    navigation.navigate('PostMediaScreen', {
                      mediaType: 'video',
                    }),
                  300,
                );
              }}>
              <View style={tw`flex justify-center mb-2`}>
                <VideoSVG />
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Video')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPost(false);
                setTimeout(
                  () =>
                    navigation.navigate('PostMediaScreen', {
                      mediaType: 'article',
                    }),
                  300,
                );
              }}>
              <View style={tw`flex justify-center mb-2`}>
                <ArticleSVG />
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {t('Article')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Web23Popup>
      <Web23Popup title="Post NFT" show={showPostNFT} setShow={setShowPostNFT}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between border-b rounded-t-xl border-grey-800 active:bg-grey-800`}
            onPress={() => navigation.navigate('LoadNFTScreen')}>
            <View style={tw`py-1`}>
              <Text style={tw`font-bold text-base text-grey-50 mb-[2px]`}>
                {t('Add from Wallet')}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {t('All your real transactions here')}
              </Text>
            </View>
            <View>
              <ArrowSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center rounded-b-xl justify-between active:bg-grey-800`}
            onPress={() => navigation.navigate('CreatePostNFTScreen')}>
            <View style={tw`py-1`}>
              <Text style={tw`font-bold text-base text-grey-50 mb-[2px]`}>
                {t('Create New')}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {t('Only for $0.5 in HBAR fees')}
              </Text>
            </View>
            <View>
              <ArrowSVG
                style={{transform: [{rotate: '-90deg'}]}}
                fill="#9E9E9E"
              />
            </View>
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup title="Coupons" show={showCoupon} setShow={setShowCoupon}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <View
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between`}>
            <Text
              style={tw`text-base font-bold text-grey-50`}
              onPress={() => setCouponType(false)}>
              {t('Fans can claim a free token')}
            </Text>
            {!couponType && (
              <View>
                <CircleCheckSVG fill="#9FDB7B" />
              </View>
            )}
          </View>
          {!couponType && (
            <View style={tw`px-3 pb-4 border-b border-grey-800`}>
              <View style={tw`w-[200px]`}>
                <Web23Input
                  placeholder={t('Token Discount')}
                  value={coupon}
                  onChange={e => setCoupon(e)}
                />
              </View>
            </View>
          )}
          <View
            style={tw.style(
              'px-3 py-[10px] flex flex-row items-center justify-between',
              !couponType ? 'rounded-b-xl' : 'rounded-none',
            )}>
            <Text
              style={tw`text-base font-bold text-grey-50`}
              onPress={() => setCouponType(true)}>
              {t('Fans can’t claim free tokens')}
            </Text>
            {couponType && (
              <View>
                <CircleCheckSVG fill="#9FDB7B" />
              </View>
            )}
          </View>
          {couponType && (
            <View style={tw`px-3 pb-4`}>
              <View style={tw`w-[200px]`}>
                <Web23Input
                  placeholder={t('Token Discount')}
                  value={coupon}
                  onChange={e => setCoupon(e)}
                />
              </View>
            </View>
          )}
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            size="sm"
            text="Save"
            onPress={() => setShowCoupon(false)}
          />
        </View>
      </Web23Popup>
      <Web23Popup
        title={t('Donations') || 'Donations'}
        show={showDonation}
        setShow={setShowDonation}>
        <View style={tw`my-4 bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`px-3 py-[10px] border-b border-grey-800 flex flex-row items-center justify-between rounded-t-xl active:bg-grey-800`}
            onPress={() => setCouponType(false)}>
            <Text style={tw`text-base font-bold text-grey-50`}>
              {t('Fans can donate')}
            </Text>
            {!couponType && (
              <View>
                <CircleCheckSVG fill="#9FDB7B" />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-[10px] flex flex-row items-center justify-between rounded-b-xl active:bg-grey-800`}
            onPress={() => setCouponType(true)}>
            <Text style={tw`text-base font-bold text-grey-50`}>
              {t('Fans can’t donate')}
            </Text>
            {couponType && (
              <View>
                <CircleCheckSVG fill="#9FDB7B" />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={tw`mb-8`}>
          <Web23Button
            text={t('Save') || 'Save'}
            size="sm"
            onPress={() => setShowDonation(false)}
          />
        </View>
      </Web23Popup>
    </>
  );
};

export default SmartSetupScreen;
