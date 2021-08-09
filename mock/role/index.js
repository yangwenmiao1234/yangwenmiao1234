export default [
    // mock get all routes form server
    {
      url: '/vue-element-admin/routes',
      type: 'get',
      response: _ => {
        return {
          code: 20000,
          data: asyncRoutes
        }
      }
    }
  ]