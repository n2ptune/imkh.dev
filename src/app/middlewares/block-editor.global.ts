export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/editor' && process.env.NODE_ENV !== 'development') {
    return abortNavigation({
      statusCode: 404,
      statusMessage: '페이지를 찾을 수 없습니다.',
      message: '페이지를 찾을 수 없습니다.'
    })
  }
})
