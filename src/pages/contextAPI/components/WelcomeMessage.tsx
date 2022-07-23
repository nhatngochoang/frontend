import { Box } from '@material-ui/core';

interface WelcomeMessageProps {
   position: string;
   country?: string;
}

export default function WelcomeMessage({ position, country = 'VietNam' }: WelcomeMessageProps) {
   return (
      <Box mb="1">
         Welcome {position} from {country}
      </Box>
   );
}
