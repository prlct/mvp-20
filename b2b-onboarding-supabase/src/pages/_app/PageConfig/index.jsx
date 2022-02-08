import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import * as routes from 'pages/routes';

import 'resources/user/user.handlers';

import MainLayout from './MainLayout';
import UnauthorizedLayout from './UnauthorizedLayout';

import PrivateScope from './PrivateScope';

const layoutToComponent = {
  [routes.layout.MAIN]: MainLayout,
  [routes.layout.UNAUTHORIZED]: UnauthorizedLayout,
  [routes.layout.NONE]: ({ children }) => children,
};

const scopeToComponent = {
  [routes.scope.PRIVATE]: PrivateScope,
  [routes.scope.PUBLIC]: ({ children }) => children,
  [routes.scope.NONE]: ({ children }) => children,
};

const PageConfig = ({ children, session }) => {
  const router = useRouter();
  const [redirectPath, setRedirectPath] = useState(null);

  const page = routes.configurations.find((r) => r.path === router.route);
  const Layout = layoutToComponent[page.layout];
  const Scope = scopeToComponent[page.scope];

  if (redirectPath && session) {
    router.push(redirectPath);
    setRedirectPath(null);
  }

  // invited user
  if (router.asPath.includes('token')
  && router.asPath.includes('type=invite')
  && !session
  && !redirectPath) {
    setRedirectPath(routes.path.onboarding);
  }

  // user confirmed email (session will be updated)
  if (!router.asPath.includes('access_token')) {
    if (page.scope === routes.scope.PRIVATE && !session) {
      router.push(routes.path.signIn);
      return null;
    }

    if (page.scope === routes.scope.PUBLIC && session) {
      router.push(routes.path.home);
      return null;
    }
  }

  return (
    <Scope>
      <Layout>
        {children}
      </Layout>
    </Scope>
  );
};

PageConfig.propTypes = {
  children: PropTypes.node.isRequired,
  session: PropTypes.shape().isRequired,
};

export default PageConfig;
