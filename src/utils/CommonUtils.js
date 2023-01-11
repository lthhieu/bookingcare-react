import { reject } from "lodash";

class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }
    static b64toBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1])
        let ab = new ArrayBuffer(byteString.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        //get type
        let split = dataURI.split(';')
        let type = split[0].slice(5)
        return (new Blob([ab], { type }))

    }
}

export default CommonUtils;