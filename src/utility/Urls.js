const azureLogin =
  "https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/authorize?client_id=7c2a7e4f-2fc8-463a-be17-acdc93f37b92&response_type=code&redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&response_mode=query&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read";
const azureLogoutUrl = `https://login.microsoftonline.com/ca56a4a5-e300-406a-98ff-7e36a0baac5b/oauth2/v2.0/logout?post_logout_redirect_uri=https%3a%2f%2fdev.ulm.metlife.com.bd%2f&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read`;

export  { azureLogin, azureLogoutUrl };
