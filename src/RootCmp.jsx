import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import { AppHeader } from './cmps/AppHeader'
import { YonaTube } from './pages/YonaTube'
import './assets/styles/main.css'

export function RootCmp() {
    return (
        <div className="yonatube-container">
            {/* <AppHeader /> */}
            <main className='main-layout'>
                <Routes>
                    <Route path="" element={<YonaTube />} />
                </Routes>
            </main>
        </div>
    )
}