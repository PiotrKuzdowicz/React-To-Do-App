import config from "../config";


export default function getAppVersion() {
  let appVersion = localStorage.getItem("appVersion");
  if (appVersion === "null" || appVersion === undefined) {
    appVersion = "1.0"
  }

  if( config.appVersion != appVersion){
      reorg()
  }

  return  config.appVersion;
}

function reorg(){

}