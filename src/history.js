import { createBrowserHistory } from "history";
import { useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

/**
 * https://stackoverflow.com/questions/69948150/property-history-does-not-exist-on-type-intrinsicattributes
 */

export const history = createBrowserHistory();

export const CustomRouter = ({ history, ...props }) => {
   const [state, setState] = useState({
      action: history.action,
      location: history.location
   });

   useLayoutEffect(() => history.listen(setState), [history]);

   return (
      <Router
         {...props}
         location={state.location}
         navigationType={state.action}
         navigator={history}
      />
   );
};