import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'pages/Home'
import { RepoBoard } from 'pages/RepoBoard'

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:id" element={<RepoBoard />} />
        </Routes>
    )
}
