
import crypto from 'crypto'
let privateKey = 'UccDyqBaZ2WahEQg2N2ZvpAbfS8EXrI7cJ822vTE';

export function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
}

export const signatureGen = (data)=>{
    const dataU = utf8_to_b64(data)
    const signString = privateKey + dataU + privateKey
    const sha1 = crypto.createHash('sha1')
    sha1.update(signString)
    const signature = sha1.digest('base64')
    return signature
}

export const dataEncode = (data) => {
    return btoa(data)
}