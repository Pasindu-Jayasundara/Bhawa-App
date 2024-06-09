const aesEcb = require('react-native-aes-ecb');

const keyString = 'DOR3GdUct5TELGG1m7boyyqExB0goYc4';


export const encrypt = (text)=>{
  return aesEcb.encrypt(keyString, text);
}

export const decrypt = (cypherText)=>{
  return aesEcb.decrypt(keyString, cypherText);
}
