import { Box, Typography } from '@mui/material';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useEffect, useState } from 'react';

type EmojiPickerProps = {
   icon?: any;
   onChange: (emoji: any) => void;
};

const EmojiPicker = (props: EmojiPickerProps) => {
   const [selectedEmoji, setSelectedEmoji] = useState();
   const [isShowPicker, setIsShowPicker] = useState(false);

   useEffect(() => {
      setSelectedEmoji(props.icon);
   }, [props.icon]);

   const selectEmoji = (e: BaseEmoji) => {
      const sym = e.unified.split('-');
      let codesArrayString: string[] = [];
      sym.forEach((el: string) => codesArrayString.push('0x' + el));
      const codesArrayNumber = codesArrayString.map((item: string) => parseInt(item, 16));
      const emoji = String.fromCodePoint(...codesArrayNumber);
      setIsShowPicker(false);
      props.onChange(emoji);
   };

   const showPicker = () => setIsShowPicker(!isShowPicker);

   return (
      <Box sx={{ position: 'relative', width: 'max-content' }}>
         <Typography variant="h3" fontWeight="700" sx={{ cursor: 'pointer' }} onClick={showPicker}>
            {selectedEmoji}
         </Typography>
         <Box
            sx={{
               display: isShowPicker ? 'block' : 'none',
               position: 'absolute',
               top: '100%',
               zIndex: '9999',
            }}
         >
            <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
         </Box>
      </Box>
   );
};

export default EmojiPicker;
