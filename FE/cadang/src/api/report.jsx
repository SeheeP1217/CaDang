import axios from 'axios'

const api = axios.create({
    baseURL: 'http://i8a808.p.ssafy.io:8080',
    headers: {
        "Content-Type": "application/json",
    },
})

// camelCase로 함수 선언, ()
async function userReview(userId, pageIndex, success, fail) {
    const res = await api.get(`/record`, {params: {userId: userId, page: pageIndex, size: 10}}).then(success).catch(fail)
    return res
}

export { userReview, }