import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function YonaTube() {
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [selectedVideoTitle, setSelectedVideoTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('Bob Marley')

    useEffect(() => {
        getVideo(searchQuery)
    }, [])

    async function getVideo(query) {
        const STORAGE_KEY = 'videosDB'
        const cachedData = loadFromStorage(STORAGE_KEY)
        if (cachedData && cachedData.query === query) {
            setVideos(cachedData.items.slice(0, 5))
            return
        }

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyD27FH2l9LwOb2so8yV7IAhrTdzxxqbXsg&q=${encodeURIComponent(query)}`

        try {
            const response = await axios.get(url)
            const fetchedVideos = response.data.items
            saveToStorage(STORAGE_KEY, { query, items: fetchedVideos })
            setVideos(fetchedVideos.slice(0, 5))
        } catch (err) {
            console.error('Error fetching videos:', err)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        getVideo(searchQuery)
    }

    function handleVideoSelect(video) {
        setSelectedVideo(video.id.videoId)
        setSelectedVideoTitle(video.snippet.title)
    }

    function saveToStorage(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    }

    function loadFromStorage(key) {
        const val = localStorage.getItem(key)
        return JSON.parse(val)
    }

    return (
        <div className="yonatube-container">
            <header className="yonatube-header">
                <form className='search-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What Do You Wanna Watch"
                        className='search-input'
                        required
                    />
                    <button type="submit">Search</button>
                </form>
            </header>

            <section className="yonatube-content">
                <div className="videos">
                    {videos.map(video => (
                        <div
                            key={video.id.videoId}
                            className="card pointer"
                            onClick={() => handleVideoSelect(video)}
                        >
                            <p>{video.snippet.title}</p>
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                        </div>
                    ))}
                </div>
                <div className="video-container">
                    {selectedVideo ? (
                        <div className="youtube-video">
                            <iframe
                                width="100%"
                                height="auto"
                                src={`https://www.youtube.com/embed/${selectedVideo}`}
                                frameBorder="0"
                                allowFullScreen
                                // style={{ aspectRatio: '16 / 9' }}
                            ></iframe>
                        </div>
                    ) : (
                        <div className='empty-video'>
                            <p>No video selected😶‍🌫️</p>
                        </div>
                    )}

                    <h2>{selectedVideoTitle || 'No video selected'}</h2>
                </div>
            </section>
        </div>
    )
}