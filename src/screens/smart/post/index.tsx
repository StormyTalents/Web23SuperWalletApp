import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Screen} from 'layouts';

import {
  Web23Avatar,
  Web23Button,
  Web23Input,
  Web23Popup,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import BidSVG from '../../../assets/icons/Bid.svg';
import LocalOfferSVG from '../../../assets/icons/local_offer.svg';
import SpaSVG from '../../../assets/icons/spa.svg';

const PostNFTScreen: React.FC<{route: any}> = ({route}) => {
  const {
    img = 'qwe',
    tokenId = 'qwe',
    name = 'wqe',
    description = 'qwe',
    category = 'qwe',
    attribute = ['qwe'],
    external_link = 'qwe',
    collection = 'qwe',
    alternate_text = 'qwe',
  } = route.params;
  const navigation = useWeb23Navigation();
  const [tab, setTab] = useState<number>(-1);
  const [priceDetail, setPriceDetail] = useState<{
    price: string;
    royalty: string;
  }>({price: '', royalty: ''});
  const [auctionDetail, setAuctionDetail] = useState<{
    price: string;
    royalty: string;
    startDate: string;
    endDate: string;
  }>({price: '', royalty: '', startDate: '', endDate: ''});
  const [showReview, setShowReview] = useState<boolean>(false);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <>
      <Screen>
        <ScreenTitle
          title="Post NFT"
          onPress={() => navigation.navigate('LoadNFTScreen')}
        />
        <View style={tw`my-4 rounded-xl bg-grey-900`}>
          <Text
            style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
            Posting
          </Text>
          <View
            style={tw`flex flex-row items-center gap-3 p-3 border-b border-grey-800`}>
            <View style={tw`w-10 h-10 rounded-[4px]`}>
              <Image source={{uri: img}} alt="nft" />
            </View>
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {name}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>{tokenId}</Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center gap-3 p-3 rounded-b-xl`}>
            <Web23Avatar
              size="sm"
              type={currentUser.type}
              name={currentUser.userName}
              color={currentUser.themeColor}
            />
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {currentUser.userName}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {currentUser.accountId}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw.style(
            'rounded-xl bg-grey-900',
            tab === 1 || tab === -1 ? 'mb-12' : 'mb-4',
          )}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200`}>
            Marketplace Listing
          </Text>
          <View style={tw`flex flex-row justify-center gap-3 p-3`}>
            <TouchableOpacity
              style={tw.style(
                'p-2 border rounded-xl',
                tab === 0 ? 'border-lime-500' : 'border-grey-800',
              )}
              onPress={() => setTab(0)}>
              <View style={tw`flex flex-col justify-center`}>
                <View style={tw`flex flex-row justify-center`}>
                  <View
                    style={tw`bg-grey-800 w-12 h-12 rounded-full flex flex-row justify-center items-center`}>
                    <LocalOfferSVG fill={tab === 0 ? '#D7FC51' : '#9E9E9E'} />
                  </View>
                </View>
                <Text style={tw`text-base font-bold text-center text-white`}>
                  Fixed Price
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'p-2 border rounded-xl',
                tab === 1 ? 'border-lime-500' : 'border-grey-800',
              )}
              onPress={() => setTab(1)}>
              <View style={tw`flex flex-col justify-center`}>
                <View style={tw`flex flex-row justify-center`}>
                  <View style={tw`flex flex-row justify-center`}>
                    <View
                      style={tw`bg-grey-800 w-12 h-12 rounded-full flex flex-row justify-center items-center`}>
                      <BidSVG fill={tab === 1 ? '#D7FC51' : '#9E9E9E'} />
                    </View>
                  </View>
                </View>
                <Text style={tw`text-base font-bold text-center text-white`}>
                  Open for Bids
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw.style(
                'p-2 border rounded-xl',
                tab === 2 ? 'border-lime-500' : 'border-grey-800',
              )}
              onPress={() => setTab(2)}>
              <View style={tw`flex flex-col justify-center`}>
                <View style={tw`flex flex-row justify-center`}>
                  <View
                    style={tw`bg-grey-800 w-12 h-12 rounded-full flex flex-row justify-center items-center`}>
                    <SpaSVG fill="#9E9E9E" />
                  </View>
                </View>
                <Text style={tw`text-base font-bold text-center text-white`}>
                  Not for Sale
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {tab === 0 && (
            <View style={tw`px-3`}>
              <Text style={tw`mb-2 text-sm font-bold text-grey-200`}>
                Fixed Price details
              </Text>
              <View style={tw`flex gap-4 mb-2`}>
                <Web23Input
                  placeholder="Price"
                  value={priceDetail.price}
                  onChange={e =>
                    setPriceDetail(prev => ({
                      ...prev,
                      price: e,
                    }))
                  }
                />
                <Web23Input
                  placeholder="Royalty"
                  value={priceDetail.royalty}
                  onChange={e =>
                    setPriceDetail(prev => ({
                      ...prev,
                      royalty: e,
                    }))
                  }
                />
              </View>
              <Text style={tw`pb-4 text-sm font-bold text-grey-400`}>
                ~$11.14 in USD
              </Text>
            </View>
          )}
          {tab === 2 && (
            <View style={tw`px-3 pb-4`}>
              <Text style={tw`mb-2 text-sm font-bold text-grey-200`}>
                Auction details
              </Text>
              <View style={tw`flex gap-4 mb-2`}>
                <Web23Input
                  placeholder="Min bid price"
                  value={auctionDetail.price}
                  onChange={e =>
                    setAuctionDetail(prev => ({
                      ...prev,
                      price: e,
                    }))
                  }
                />
                <Web23Input
                  placeholder="Royalty"
                  value={auctionDetail.royalty}
                  onChange={e =>
                    setAuctionDetail(prev => ({
                      ...prev,
                      royalty: e,
                    }))
                  }
                />
              </View>
              <Text style={tw`mb-4 text-sm font-bold text-grey-400`}>
                ~$11.14 in USD
              </Text>
              <View style={tw`flex flex-col gap-4`}>
                <Web23Input
                  placeholder="Auction start time (IST)"
                  value={auctionDetail.startDate}
                  onChange={e =>
                    setAuctionDetail(prev => ({
                      ...prev,
                      startDate: e,
                    }))
                  }
                />
                <Web23Input
                  placeholder="Auction end time (IST)"
                  value={auctionDetail.endDate}
                  onChange={e =>
                    setAuctionDetail(prev => ({
                      ...prev,
                      endDate: e,
                    }))
                  }
                />
              </View>
            </View>
          )}
        </View>
        <Web23Button
          text="Continue to review"
          disabled={
            ((priceDetail.price === '' || priceDetail.royalty === '') &&
              tab === 0) ||
            (tab === 2 &&
              (auctionDetail.startDate === '' ||
                auctionDetail.royalty === '' ||
                auctionDetail.startDate === '' ||
                auctionDetail.endDate === '')) ||
            tab === -1
          }
          onPress={() => setShowReview(true)}
        />
      </Screen>
      <Web23Popup
        title="Review NFT Post"
        show={showReview}
        setShow={setShowReview}>
        <View style={tw`my-4 rounded-xl bg-grey-900`}>
          <Text
            style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
            Posting
          </Text>
          <View
            style={tw`flex flex-row items-center gap-3 p-3 border-b border-grey-800`}>
            <View style={tw`w-10 h-10 rounded-md`}>
              <Image source={{uri: img}} alt="nft" />
            </View>
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {name}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>{tokenId}</Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center gap-3 p-3 rounded-b-xl`}>
            <Web23Avatar
              size="sm"
              type={currentUser.type}
              name={currentUser.userName}
              color={currentUser.themeColor}
            />
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                {currentUser.userName}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                {currentUser.accountId}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`mb-4 rounded-xl bg-grey-900`}>
          <Text
            style={tw`font-bold text-sm text-grey-200 px-3 pt-[18px] pb-[2px]`}>
            Marketplace Listing
          </Text>
          <View style={tw`flex flex-row items-center gap-3 p-3`}>
            <View
              style={tw`flex flex-row items-center justify-center w-10 h-10 rounded-full bg-grey-700`}>
              {tab === 0 && <LocalOfferSVG fill="#D7FC51" />}
              {tab === 1 && <BidSVG fill="#D7FC51" />}
              {tab === 2 && <SpaSVG fill="#D7FC51" />}
            </View>
            <View>
              <Text style={tw`mb-1 text-base font-bold text-grey-50`}>
                32 HBAR (~11.14 USD)
              </Text>
              <Text style={tw`text-xs font-bold text-grey-400`}>
                Fixed Price
              </Text>
            </View>
          </View>
        </View>
        <Web23Input placeholder="Add Comment (optional)" />
        <View style={tw`mt-4 mb-8`}>
          <Web23Button
            text="Post NFT"
            onPress={() => {
              setShowReview(false);
              setTimeout(() => {
                navigation.navigate('SmartSetupScreen');
              }, 300);
            }}
          />
        </View>
      </Web23Popup>
    </>
  );
};

export default PostNFTScreen;
