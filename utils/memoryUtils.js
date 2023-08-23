let router_status = {
  pathname: "",
  query: {},
};
export const current_router_status = {
  getCurrent() {
    return router_status;
  },
  setCurrent(pathname, query = {}) {
    router_status.pathname = pathname;
    router_status.query = query;
  },
  removeCurrent() {
    router_status = {
      pathname: "",
      query: {},
    };
  },
};
