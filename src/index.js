import axios from 'axios'

const STORAGE_KEY = 'videosDB'

export async function getVideo(query) {
    const cachedData = loadFromStorage(STORAGE_KEY)
    if (cachedData && cachedData.query === query) {
        return cachedData.items.slice(0, 5)
    }
    
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyD27FH2l9LwOb2so8yV7IAhrTdzxxqbXsg&q=${encodeURIComponent(query)}`

    try {
        const response = await axios.get(url)
        const fetchedVideos = response.data.items
        saveToStorage(STORAGE_KEY, { query, items: fetchedVideos })
        return fetchedVideos.slice(0, 5)
    } catch (err) {
        console.error('Error fetching videos:', err)
        return []
    }
}

export function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

export function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}