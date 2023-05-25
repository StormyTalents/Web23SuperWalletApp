import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

import {Screen} from 'layouts';

import {
  Web23Button,
  Web23Modal,
  Web23Input,
  Web23Popup,
  Web23Scrollbox,
  ScreenTitle,
} from 'components';

import {useWeb23Navigation} from 'navigation';

import tw from 'utils/tailwind';

import VisibilitySVG from '../../../assets/icons/visibility.svg';
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
import MDHBarSVG from '../../../assets/icons/md_hbar.svg';
import CircleWavyCheckSVG from '../../../assets/icons/CircleWavyCheck.svg';
import ArrowDownSVG from '../../../assets/icons/arrow-down.svg';

const DetailPostViewDesktopScreen: React.FC<{route: any}> = ({route}) => {
  const {
    img = 'qwe',
    tokenId = 'qwe',
    name = 'qwe',
    description = 'qwe',
    category = 'qwe',
    attribute = [],
    external_link = 'qwe',
    collection = 'qwe',
    alternate_text = 'qwe',
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

  return (
    <>
      <Screen>
        <ScreenTitle
          title={name}
          onPress={() => navigation.navigate('SmartSetupScreen')}
        />
        <View style={tw`mb-6`}>
          <Image
            source={require('../../../assets/png/post-nft.png')}
            alt="post nft"
          />
        </View>
        <View style={tw`px-6 pb-[86px]`}>
          <Web23Button text="List for Sale" size="sm" />
          <View style={tw`flex flex-row items-center justify-between my-6`}>
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
                    backMode: 'desktop',
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
              <View style={tw`flex flex-row items-center gap-1`}>
                <VisibilitySVG />
                <Text style={tw`text-sm font-bold text-white`}>45</Text>
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
          <View
            style={tw`flex flex-row items-stretch py-3 my-6 border justify-evenly rounded-xl border-grey-800`}>
            <View>
              <Text
                style={tw`mb-1 text-xs font-bold text-center text-grey-400`}>
                Last Sale Price
              </Text>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MDHBarSVG />
                <Text style={tw`flex flex-row text-xl font-bold text-white`}>
                  1,321.79
                </Text>
              </View>
            </View>
            <View style={tw`flex flex-row`}>
              <View style={tw`w-[1px] h-full border-r-[1px] border-grey-800`} />
            </View>
            <View>
              <Text
                style={tw`mb-1 text-xs font-bold text-center text-grey-400`}>
                Floor Value
              </Text>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MDHBarSVG />
                <Text style={tw`flex flex-row text-xl font-bold text-white`}>
                  1,100.00
                </Text>
              </View>
            </View>
          </View>
          <Text style={tw`text-sm font-bold text-grey-400`}>Description</Text>
          <Text
            style={tw`font-medium text-base text-white line-clamp-4 mb-[2px]`}>
            {description}
          </Text>
          <Text style={tw`mb-6 text-sm font-bold text-lime-500`}>
            Read more
          </Text>
          <View
            style={tw`flex flex-row justify-between mb-2 text-sm font-bold text-grey-400`}>
            <Text>Category</Text>
            <Text>Collection</Text>
          </View>
          <View
            style={tw`flex flex-row justify-between mb-6 text-base font-medium text-white`}>
            <Text>PFP</Text>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text>Croakmores</Text>
              <CircleWavyCheckSVG />
            </View>
          </View>
          {attribute?.length > 0 ? (
            <Web23Scrollbox>
              {attribute?.map((item: any, id: number) => (
                <View key={id.toString() + item.name}>
                  <View
                    style={tw`p-3 rounded-[4px] border border-[rgb(255,_255,_255,_0.32)]`}>
                    <Text style={tw`mb-1 text-xs font-bold text-grey-400`}>
                      {item.name}
                    </Text>
                    <Text
                      style={tw`text-base font-medium text-white whitespace-nowrap`}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              ))}
            </Web23Scrollbox>
          ) : (
            <View style={tw`p-3 border border-white border-opacity-30`}>
              <Text
                style={tw`mb-2 text-base font-bold text-center text-grey-50`}>
                Not added yet
              </Text>
              <Text
                style={tw`px-10 text-xs font-bold text-center text-grey-600`}>
                Add attributes and their respective percentages
              </Text>
            </View>
          )}
          <View
            style={tw`flex flex-row items-center justify-between px-3 py-4 mt-6 border rounded-xl border-grey-800`}>
            <Text style={tw`text-sm font-bold text-grey-200`}>Activity</Text>
            <ArrowDownSVG style={tw`rotate-180`} fill="#9E9E9E" />
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
            onPress={() => {
              setShowPostOption(false);
            }}>
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
        <View style={tw`mb-8`}>
          <Web23Button
            text="Report"
            variant="secondary"
            size="sm"
            onPress={() => {
              setShowReport(false);
              setTimeout(() => {}, 300);
            }}
          />
        </View>
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
        <View style={tw`flex justify-center`}>
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
          <hr style={tw`mb-4 border-grey-800`} />
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

export default DetailPostViewDesktopScreen;
