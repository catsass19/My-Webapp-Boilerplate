import * as React from 'react';
import Loadable from 'react-loadable';
import Logo from '@/assets/logo.png';
import Loading from '@/component/Loading';

const Test = Loadable({
    loader: () => import(/* webpackChunkName: "Header" */ '@/component/Header'),
    loading: Loading
});

class Main extends React.Component {
    public render() {
        return (
          <div>
              <Test />
          </div>
        );
    }
}

const AppMain = <Main />;

export { AppMain };
