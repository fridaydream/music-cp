import { useEffect } from 'react';
import {
  InitialStoresProps
} from '@/store/types'

export interface QueryProps {
  query?: {
    code: string;
  };
}

type ComponentType = { (): JSX.Element; getInitialProps: (props: InitialStoresProps) => void; }

export function requestInitialData(props: InitialStoresProps & QueryProps, component: ComponentType) {
  useEffect(() => {
    // 客户端运行时
    if (typeof window !== 'undefined') {
      // 非同构时，并且getInitialProps存在
      if (window.location.pathname !== window.__SSRPATH__ && component.getInitialProps) {
        console.log('post===')
        component.getInitialProps(props)
      }
    }
  }, [1]);
}
