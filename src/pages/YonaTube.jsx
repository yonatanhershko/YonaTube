import React, { useState, useEffect } from 'react'
import {getVideo} from '../index.js'

export function YonaTube() {
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [selectedVideoTitle, setSelectedVideoTitle] = useState('')
    const [searchQuery, setSearchQuery] = useState('Bob Marley')

    useEffect(() => {
        fetchVideos(searchQuery)
    }, [])

    async function fetchVideos(query) {
        const fetchedVideos = await getVideo(query)
        setVideos(fetchedVideos)
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetchVideos(searchQuery)
    }

    function handleVideoSelect(video) {
        setSelectedVideo(video.id.videoId)
        setSelectedVideoTitle(video.snippet.title)
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