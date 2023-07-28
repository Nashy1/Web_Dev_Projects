import axios from "axios"

class MovieDataService {

    getAll(page = 0) {
        return axios.get(`https://moviereviews1.onrender.com//movies?page=${page}`)        
    }

    get(id) {
        return axios.get(`https://moviereviews1.onrender.com//movies/id/${id}`)        
    }

    find(query, by = "title", page = 0) {
        return axios.get (`https://moviereviews1.onrender.com//movies?${by}=${query}&page=${page}`)
    }

    createReview(data) {
        return axios.post("https://moviereviews1.onrender.com//movies/review", data)
    }

    updateReview(data) {
        return axios.put("https://moviereviews1.onrender.com//movies/review", data)
    }

    deleteReview(id, userId) {
        return axios.delete (
            "https://moviereviews1.onrender.com//movies/review",
            {data:{review_id: id, user_id: userId}}
        )
    }

    getRatings() {
        return axios.get("http://https://moviereviews1.onrender.com//movies/ratings")
    }
}

export default new MovieDataService()