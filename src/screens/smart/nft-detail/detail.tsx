import React, {useState, useContext} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';

import {Screen} from 'layouts';

import {Web23Button, Web23Input, Web23Modal, Web23Popup} from 'components';

import {useWeb23Navigation} from 'navigation';

import {SettingContext} from 'utils/context';
import getSelectedUser from 'utils/getSelectedUser';
import tw from 'utils/tailwind';

import ArrowBackSVG from '../../../assets/icons/arrow_back.svg';
import FavoriteSVG from '../../../assets/icons/favorite_border.svg';
import CommentSVG from '../../../assets/icons/mode_comment.svg';
import BookMarkSMSVG from '../../../assets/icons/bookmark_border_sm.svg';
import MoreSVG from '../../../assets/icons/more_horiz.svg';
import FileUploadSVG from '../../../assets/icons/file_upload.svg';
import BookMarkSVG from '../../../assets/icons/bookmark_border.svg';
import ArchiveSVG from '../../../assets/icons/archive.svg';
import TrashSVG from '../../../assets/icons/trash.svg';
import DesktopSVG from '../../../assets/icons/desktop_windows.svg';
import LaunchSVG from '../../../assets/icons/launch.svg';
import ReportSVG from '../../../assets/icons/report.svg';

const DetailPostViewScreen: React.FC<{route: any}> = ({route}) => {
  const {
    img = '',
    tokenId = '',
    name = '',
    description = '',
    category = '',
    attribute = [],
    external_link = '',
    collection = '',
    alternate_text = '',
  } = route.params;
  const navigation = useWeb23Navigation();
  const [showPostOption, setShowPostOption] = useState<boolean>(false);
  const [showArchive, setShowArchive] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [reportDetail, setReportDetail] = useState<{
    title: string;
    desc: string;
  }>({title: '', desc: ''});
  const [showLiked, setShowLiked] = useState<boolean>(false);
  const {settings} = useContext(SettingContext);
  const currentUser = getSelectedUser(settings.userData, settings.selectedUser);

  return (
    <>
      <Screen>
        <TouchableOpacity
          style={tw`absolute top-5 left-6`}
          onPress={() => navigation.navigate('SmartSetupScreen')}>
          <ArrowBackSVG fill="#D6D6D6" />
        </TouchableOpacity>
        <View>
          {img ? (
            <Image source={{uri: img}} alt="post nft" />
          ) : (
            <Image
              source={require('../../../assets/png/post-nft.png')}
              alt="post nft"
            />
          )}
        </View>
        <View
          style={tw`px-6 pt-[14px] pb-6 bg-black bg-opacity-70 absolute top-[372px] w-full`}>
          <View style={tw`flex flex-row items-center gap-2 mb-2`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-200`} />
            <View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                {currentUser.userName}
              </Text>
              <Text style={tw`text-xs font-bold text-grey-200`}>
                12 hrs ago
              </Text>
            </View>
          </View>
          <Text style={tw`mb-2 text-base font-bold text-grey-50`}>{name}</Text>
          <Text style={tw`mb-2 text-base font-medium text-grey-400`}>
            {description}
            {description.length > 32 && (
              <Text style={tw`text-lime-500`}>Read more</Text>
            )}
          </Text>
          <View style={tw`flex flex-row items-center justify-between mb-3`}>
            <View style={tw`flex flex-row gap-3`}>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-1`}
                onPress={() => setShowLiked(true)}>
                <FavoriteSVG />
                <Text style={tw`text-sm font-bold text-white`}>1200</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-1`}
                onPress={() =>
                  navigation.navigate('CommentScreen', {
                    backMode: 'normal',
                    img,
                    tokenId,
                    name,
                    description,
                    category,
                    attribute,
                    external_link,
                    collection,
                    alternate_text,
                  })
                }>
                <CommentSVG />
                <Text style={tw`text-sm font-bold text-white`}>45</Text>
              </TouchableOpacity>
              <View style={tw`flex flex-row items-center gap-1`}>
                <BookMarkSMSVG />
                <Text style={tw`text-sm font-bold text-white`}>11</Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-10 h-10 rounded-full bg-grey-900 active:bg-grey-800`}
              onPress={() => {
                setShowPostOption(true);
              }}>
              <MoreSVG fill="#F4F4F4" />
            </TouchableOpacity>
          </View>
          <View>
            <Web23Button text="Buy for $49" size="sm" />
          </View>
        </View>
      </Screen>
      <Web23Popup show={showPostOption} setShow={setShowPostOption}>
        <View style={tw`flex flex-row justify-between mb-4`}>
          <TouchableOpacity
            style={tw`w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800`}
            onPress={() => {
              setShowPostOption(false);
            }}>
            <View style={tw`flex flex-row justify-center mb-1`}>
              <FileUploadSVG />
            </View>
            <Text style={tw`text-sm font-bold text-center text-white`}>
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[70px] h-[80px]  px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800`}
            onPress={() => {
              setShowPostOption(false);
            }}>
            <View style={tw`flex flex-row justify-center mb-1`}>
              <BookMarkSVG />
            </View>
            <Text style={tw`text-sm font-bold text-center text-white`}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800`}
            onPress={() => {
              setShowArchive(true);
              setShowPostOption(false);
            }}>
            <View style={tw`flex flex-row justify-center mb-1`}>
              <ArchiveSVG />
            </View>
            <Text style={tw`text-sm font-bold text-center text-white`}>
              Archive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[70px] h-[80px] px-[10px] py-3 bg-grey-900 rounded-[4px] active:bg-grey-800`}
            onPress={() => {
              setShowDelete(true);
              setShowPostOption(false);
            }}>
            <View style={tw`flex flex-row justify-center mb-1`}>
              <TrashSVG />
            </View>
            <Text style={tw`text-sm font-bold text-center text-white`}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`bg-grey-900 rounded-xl`}>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 border-b border-grey-800 active:bg-grey-800 rounded-t-xl`}
            onPress={() =>
              navigation.navigate('DetailPostViewDesktopScreen', {
                img,
                tokenId,
                name,
                description,
                category,
                attribute,
                external_link,
                collection,
                alternate_text,
              })
            }>
            <View style={tw`flex flex-row items-center gap-3`}>
              <View>
                <DesktopSVG />
              </View>
              <Text style={tw`text-base font-bold text-grey-50`}>
                Open on Desktop
              </Text>
            </View>
            <View>
              <LaunchSVG />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-between px-3 py-4 mb-8 active:bg-grey-800 rounded-b-xl`}
            onPress={() => {
              setShowReport(true);
              setShowPostOption(false);
            }}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <View>
                <ReportSVG />
              </View>
              <Text style={tw`text-base font-bold text-red-400`}>Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Web23Popup>
      <Web23Popup title="Report" show={showReport} setShow={setShowReport}>
        <View style={tw`pb-4 my-4 bg-grey-900 rounded-xl`}>
          <Text
            style={tw`px-3 pt-[18px] pb-[2px] font-bold text-sm text-grey-200`}>
            Please tell us why you are reporting this
          </Text>
          <View style={tw`flex flex-col gap-4 px-3 mt-4`}>
            <Web23Input
              placeholder="Title"
              value={reportDetail.title}
              onChange={e => setReportDetail(prev => ({...prev, title: e}))}
            />
            <Web23Input
              placeholder="Description"
              value={reportDetail.desc}
              onChange={e => setReportDetail(prev => ({...prev, desc: e}))}
            />
          </View>
        </View>
        <TouchableOpacity style={tw`mb-8`}>
          <Web23Button
            text="Report"
            variant="secondary"
            size="sm"
            onPress={() => {
              setShowReport(false);
              setTimeout(() => {}, 300);
            }}
          />
        </TouchableOpacity>
      </Web23Popup>
      <Web23Modal show={showArchive}>
        <View style={tw`w-[280px]`}>
          <Text style={tw`mb-3 text-base font-bold text-white`}>
            Archive Post?
          </Text>
          <Text style={tw`mb-6 text-sm font-bold text-grey-400`}>
            Are you sure you want to archive “Guardians of the Gwa’ol #3201”
            post?
          </Text>
          <Text style={tw`mb-4 text-sm font-bold text-grey-400`}>
            Don’t worry. You can always unarchive it.
          </Text>
        </View>
        <View style={tw`mb-4 border-grey-800 w-full h-[1px]`} />
        <View style={tw`flex flex-row justify-center`}>
          <View style={tw`w-[280px] flex flex-row gap-4`}>
            <Web23Button
              text="Cancel"
              size="sm"
              variant="secondary"
              onPress={() => {
                setShowArchive(false);
              }}
            />
            <Web23Button
              text="Archive"
              size="sm"
              onPress={() => {
                setShowArchive(false);
                setTimeout(() => {}, 300);
              }}
            />
          </View>
        </View>
      </Web23Modal>
      <Web23Modal show={showDelete}>
        <View style={tw`w-[280px]`}>
          <Text style={tw`mb-3 text-base font-bold text-white`}>
            Delete Post?
          </Text>
          <Text style={tw`mb-4 text-sm font-bold text-grey-400`}>
            Are you sure you want to delete “Guardians of the Gwa’ol #3201”
            post?
          </Text>
          <View style={tw`mb-4 border-grey-800 w-full h-[1px]`} />
          <View style={tw`flex flex-row gap-4`}>
            <Web23Button
              text="Cancel"
              variant="secondary"
              size="sm"
              onPress={() => {
                setShowDelete(false);
              }}
            />
            <Web23Button
              text="Delete"
              variant="danger"
              size="sm"
              onPress={() => {
                setShowDelete(false);
                setTimeout(() => {}, 300);
              }}
            />
          </View>
        </View>
      </Web23Modal>
      <Web23Popup
        title="Liked by 1200 people"
        show={showLiked}
        setShow={setShowLiked}>
        <View style={tw`mt-4 mb-8 bg-grey-900 rounded-xl`}>
          <View
            style={tw`px-3 py-[10px] border-b border-grey-800 flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50`}>
                dilipmerugu
              </Text>
              <Text style={tw`text-sm font-medium text-grey-200`}>
                dilipmerugu.hbar
              </Text>
            </View>
          </View>
          <View
            style={tw`px-3 py-[10px] border-b border-grey-800 flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50`}>dinoman</Text>
              <Text style={tw`text-sm font-medium text-grey-200`}>
                dinoman.hbar
              </Text>
            </View>
          </View>
          <View
            style={tw`px-3 py-[10px] border-b border-grey-800 flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50`}>
                malevolent
              </Text>
              <Text style={tw`text-sm font-medium text-grey-200`}>
                malevolent.hbar
              </Text>
            </View>
          </View>
          <View
            style={tw`px-3 py-[10px] border-b border-grey-800 flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50`}>ursula</Text>
              <Text style={tw`text-sm font-medium text-grey-200`}>
                ursula.hbar
              </Text>
            </View>
          </View>
          <View
            style={tw`px-3 py-[10px] rounded-b-xl flex flex-row gap-3 items-center`}>
            <View style={tw`w-10 h-10 rounded-full bg-grey-400`} />
            <View style={tw`py-1`}>
              <Text style={tw`text-base font-bold text-grey-50`}>octopus</Text>
              <Text style={tw`text-sm font-medium text-grey-200`}>
                octopus.hbar
              </Text>
            </View>
          </View>
        </View>
      </Web23Popup>
    </>
  );
};

export default DetailPostViewScreen;
