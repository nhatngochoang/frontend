import * as React from 'react';
import Demo from './Demo';
import ThirdPartyComponents from './ThirdPartyComponents';

export interface ReactHookFormProps {}

export default function ReactHookForm(props: ReactHookFormProps) {
   return (
      <>
         <Demo />
         <hr />
         <ThirdPartyComponents />
      </>
   );
}
