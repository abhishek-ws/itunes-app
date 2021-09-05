import NotFound from '@containers/NotFoundPage/Loadable';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
