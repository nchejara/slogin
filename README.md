Welcome to slogin!
=
---

**slogin** module allows to connect social network like _Facebook, Github, Gmail and etc_. Currently it only support Facebook. 

Installation
------------
> npm install slogin

Quick Start
-----------

**slogin** module require app ID, Secret Key, redirect URL and Network proxy(optional). Regester your application on facebook(<a href="https://developers.facebook.com/"> Click here</a> ) in order to get appID, Secret Key.

`var **appId** = "your facebook appID";`
`var **secretKey** = "your facebook secret Key";`
`var **redirectURL** = "your redirect URL";`
`var **proxy** = "proxy URL" // this is optional`
`var **facebookOAuth** = require("**slogin**")(**_appId, secretKey, redirectURL, proxy_**);`

Get facebook login page.

`**facebookOAuth**.getLogin(function(err, loginUrl){`
`_//navigate 'loginUrl' and enter your facebook username and password_`
`});`

Enter facebook username and password and fb callback to redirecturl with unique code as a query parameter
`facebookOAuth.getFBDetails(code, function(err, details){`
`if(!err)`
`console.dir(details);`
`});`
