import axios from 'axios'

const api = axios.create({
    baseURL: 'http://i8a808.p.ssafy.io:8080',
    headers: {
        "Content-Type": "application/json",
        // "Authorization" : 'Bearer' + eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmFiMTIzNCIsImlkIjoxOSwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY3NTgzMTEzNH0.-afHFW52HQ70yY0WSDVeXUMGGpj5CL8TYZ1II_MpRvIDxg78L5iWGJbR4x0VLI--efBEsKbYSPofkq6YHesXRg,
    },
})

// camelCase로 함수 선언, ()
async function userReview(userId, pageIndex, success, fail) {
    const res = await api.get(`/record`, {params: {userId: userId, page: pageIndex, size: 10}}).then(success).catch(fail)
    return res
}

export { userReview, }