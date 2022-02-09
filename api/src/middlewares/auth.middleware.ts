const auth = (ctx: any, next: () => Promise<unknown>) => {
  // TODO: EDOT
  return next();

  if (ctx.state.user) {
    return next();
  }

  ctx.status = 401;
  ctx.body = {};
  return null;
};

export default auth;
