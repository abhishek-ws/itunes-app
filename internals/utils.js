function isUAT() {
  return process.env.ENVIRONMENT_NAME === 'uat';
}
function getBasePublicPath() {
  return isUAT() ? './' : '/';
}

module.exports = { getBasePublicPath, isUAT };
