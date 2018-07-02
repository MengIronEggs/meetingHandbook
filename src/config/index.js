/**
 * 项目配置信息
 */
const isPublish = () => {
    return window.location.host.indexOf("guoanfamily.com") !== -1;
};

const isTest = () => {
    return window.location.host.indexOf("rtest.guoanfamily.com") !== -1 || window.location.host.indexOf("rt.guoanfamily.com") !== -1;
};

let def = {};

// const domain = `mt.guoanfamily.com`;
const domain = `mt.guoanfamily.com`;
// const domainManagent = "172.16.40.206:9092/";
const domainManagent = "mt.guoanfamily.com/asmanage/";
let dev = {
    // INTERFACE: `https://${domain}/handbook/`,
    UPLOAD_IMAGE: `https://${domain}/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `https://${domain}/handbook/detailimgupload`,
    // UPLOAD_FILE: `https://${domain}/handbook/HbfileSave`,
    UPLOAD_FILE: `https://${domainManagent}HbfileSave`,
    UPLOAD_TRIP: `https://${domain}/handbook/ImportTrip`,
    SOCKET: `wss://${domain}/handhabook/`,
    INTERFACE: `https://${domainManagent}`,
   
};

let test = {};

let prod = {
    INTERFACE: `https://${domainManagent}`,
    UPLOAD_IMAGE: `https://${domain}/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `https://${domain}/handbook/detailimgupload`,
    UPLOAD_FILE: `https://${domainManagent}/HbfileSave`,
    UPLOAD_TRIP: `https://${domain}/handbook/ImportTrip`,
    SOCKET: `wss://${domainManagent}/handbook/`
};

let config = dev;

if (isTest()) {
    config = test;
} else if (isPublish()) {
    config = prod;
}

config = Object.assign(config, def);
export {config}
