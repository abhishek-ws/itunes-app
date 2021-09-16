import NotFound from '@containers/NotFoundPage/Loadable';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
import TrackDetails from '@containers/ItunesContainer/TrackDetails/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  itunes: {
    component: ItunesContainer,
    ...routeConstants.itunes
  },
  details: {
    component: TrackDetails,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
