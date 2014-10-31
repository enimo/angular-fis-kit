function FindProxyForURL(url, host) {
    if (shExpMatch(url, "http://v.youku.com/player/*") ||
            shExpMatch(url, "http://apps.bdimg.com/cloudaapi/lightapp.js*") ||
            shExpMatch(url, "http://apps.bdimg.com/cloudaapi/api-list.js*") ||
      
            shExpMatch(url, "http://openapi.baidu.com/cloudaapi/lightapp.js*") ||
            shExpMatch(url, "https://openapi.baidu.com/cloudaapi/lightapp.js*") ||

            shExpMatch(url, "http://apps.bdimg.com/cloudaapi/*") ||

            shExpMatch(url, "http://m.baidu.com/static/search/siteapp/lego/*")) {

        return "PROXY tc-dev-light00.tc.baidu.com:8080";

        #return "PROXY tc-dev-light00.tc.baidu.com:8080/static/cloudaapi/lightapp.js";
        
        return "PROXY 127.0.0.1:8888";
        
        return "PROXY 172.22.149.109:8888";
        
        #return "SOCKS5 127.0.0.1:7070; DIRECT";

    }
    return "DIRECT";
}