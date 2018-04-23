import * as React from 'react';
import Logo from '@/assets/logo.png';

class Main extends React.Component {
    public render() {
        return (
          <div>
              <img src={Logo} />
          </div>
        );
    }
}

const AppMain = <Main />;

export { AppMain };
