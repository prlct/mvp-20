export const scope = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  NONE: null,
};

export const layout = {
  MAIN: 'main',
  UNAUTHORIZED: 'unauthorized',
  NONE: null,
};

export const path = {
  home: '/',
  404: '/404',
  signIn: '/sign-in',
  signUp: '/sign-up',
};

export const configuration = {
  home: {
    path: path.home,
    scope: scope.PRIVATE,
    layout: layout.MAIN,
  },
  404: {
    path: path['404'],
    scope: scope.NONE,
    layout: layout.UNAUTHORIZED,
  },
  signIn: {
    path: path.signIn,
    scope: scope.PUBLIC,
    layout: layout.UNAUTHORIZED,
  },
  signUp: {
    path: path.signUp,
    scope: scope.PUBLIC,
    layout: layout.UNAUTHORIZED,
  },
};

export const configurations = Object.values(configuration);
