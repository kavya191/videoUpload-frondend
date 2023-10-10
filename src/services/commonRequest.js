//axios api
//import axios
import axios from "axios";
//create common  api structure
export const commonRequest=async(method,url,body)=>{
    let requestConfig={
        method,
        url,
        data:body
    }
    return await axios(requestConfig).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}