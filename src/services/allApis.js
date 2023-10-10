import { BASE_URL } from "./baseUrl";
import { commonRequest } from "./commonRequest";

//api for video add -post- url,bodydata

export const addvideo=async(body)=>{
  return await commonRequest("POST",`${BASE_URL}/vedios`,body)
}

//api for get vedios -get -url
export const getAllVideos=async()=>{
    return await commonRequest("GET",`${BASE_URL}/vedios`,"")
}

//api for add category - post -url,body

export const addCategory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/category`,body)

}
//api for get all category -url
export const getAllcategories=async()=>{
    return await commonRequest("GET",`${BASE_URL}/category`,"")
}

//api for delete vedio - delete - url
export const deleteVedio=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/vedios/${id}`,{})
}

//api for delet category
export const deleteCategory=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/category/${id}`,{})
}
//api for get watch history

export const getWatchHistory=async()=>{
    return await commonRequest("GET",`${BASE_URL}/histories`,"")
}

//api to add  history

export const addHistory=async(body)=>{
    return await commonRequest("POST",`${BASE_URL}/histories`,body)

}
//api to get single video
export const dragSIngleVideo=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/vedios/${id}`,{})
}
//api to update category array
export const updateCategory=async(id,body)=>{
    return await commonRequest("PUT",`${BASE_URL}/category/${id}`,body)

}