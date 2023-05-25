import React, {useState, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

import tw from 'utils/tailwind';

const Web23Scrollbox: React.FC<{children: React.ReactNode}> = ({children}) => {
  const ref = useRef<TouchableOpacity>(null);
  const [state, setState] = useState<{
    isScrolling: boolean;
    clientX: number;
    scrollX: number;
  }>({isScrolling: false, clientX: 0, scrollX: 0});

  const onMouseDown = (e: any) => {
    setState({...state, isScrolling: true, clientX: e.clientX});
  };

  const onMouseUp = () => {
    setState({...state, isScrolling: false});
  };

  const onMouseMove = (e: any) => {
    const {clientX, scrollX} = state;
    if (state.isScrolling) {
      if (ref.current != null) {
        ref.current.scrollLeft = scrollX - (e.clientX - clientX);
        setState({
          ...state,
          scrollX: ref.current.scrollLeft,
          clientX: e.clientX,
        });
      }
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPressIn={onMouseDown}
      onPressOut={onMouseUp}
      //on={onMouseMove}
      style={tw`flex flex-row gap-2 overflow-x-auto no-scrollbar cursor-grab`}>
      {React.Children.map(children, child => React.Children.only(child))}
    </TouchableOpacity>
  );
};

export default Web23Scrollbox;
