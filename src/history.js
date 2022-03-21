//https://stackoverflow.com/questions/70881320/redirect-to-route-from-saga-using-react-router-v6

// https://stackoverflow.com/questions/68399876/how-to-navigate-outside-of-react-component-using-react-router-6/70002872#70002872
import { useNavigate } from 'react-router-dom';

const NavigateSetter = () => {
   History.navigate = useNavigate();
   return null;
};

const History = {
   navigate: null,
   push: (page, ...rest) => History.navigate(page, ...rest),
};

export { NavigateSetter }
export default History;
