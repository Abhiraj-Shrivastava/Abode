const expressJwt = require("express-jwt");
const config = require("../../nodemon.json");

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["RS256", "HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/adminlogin/chkadminlogin",
      "/users/all_vendor_properties",
      "/users/displayallcities",
      "/users/displayallstates"


    
    ],
  });
}

module.exports = jwt;
