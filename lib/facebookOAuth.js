module.exports = function(appID, secretKey, redirectURL, proxy){
    var request = require("request");

    var facebook = {
        getLogin: function(callback){
            callback(null, "https://www.facebook.com/dialog/oauth?client_id=" + appID + "&redirect_uri=" + redirectURL);
        },
        getFBDetails:function(permissionCode, callback){
            getAccessToken(permissionCode, function(err, accessToken){
                if(err){
                    callback(err, null);
                }else{
                    getBasicInfo(accessToken, function(err, profileData){
                       if(err){
                           callback(err, null);
                       }else{
                           profileData = JSON.parse(profileData);
                           profileData.image = "https://graph.facebook.com/" + profileData.id + "/picture";
                           callback(err, profileData);
                       }

                   });
                }
            });
        }
    }

    /*
     * Sending request and get tokens
     */
    function makeRequest(url, callback){
        var reqSettings = {
            method: 'GET',
            url: url,
            proxy: proxy
        }
        request(reqSettings, function(error, response, token){
            if(error){
                callback(error, null);
            }else{
                callback(error, token);
            }
        });
    }
    function getAccessToken(permissionCode, callback){
        var fb_code_exchange_url = "https://graph.facebook.com/oauth/access_token?client_id=" + appID +
            "&redirect_uri=" + redirectURL +
            "&client_secret=" + secretKey +
            "&code=" + permissionCode;
        makeRequest(fb_code_exchange_url, callback);
    }
    function getBasicInfo(accessToken, callback){
        var profile_data_url="https://graph.facebook.com/me?" + accessToken;
        makeRequest(profile_data_url, callback);
    }
    function validation(callback){
        if(typeof appID === 'undefined' || appID === "" || appID === null)
            callback(new Error("Client-id is require (It should not be Empty and null)."), false);
        else if(typeof secretKey === 'undefined' || secretKey === "" || secretKey === null)
            callback(new Error("Secret key is require (It should not be Empty and Null)."), false);
        else if(typeof redirectURL === 'undefined' || redirectURL === "" || redirectURL === null)
            callback(new Error("Redirect URL is require (It should not be Empty and Null)."), false);
        else
            callback(null, true);



    }


    return facebook;
};



