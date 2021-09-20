export default {
  itunes: {
    route: '/',
    props: {
      maxwidth: 1000,
      padding: 20,
      containerWidth: 500
    },
    exact: true
  },
  trackDetails: {
    routeDetails: '/details/',
    route: '/details/:trackId',
    props: {
      width: 50,
      height: 38,
      padding: 20
    },
    exact: true
  }
};
