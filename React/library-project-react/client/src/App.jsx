import { lazy, Suspense, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router'
import { DarkModeProviderWrapper } from './context/theme.context.jsx'
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const SearchBooksPage = lazy(() => import('./pages/SearchBooksPage.jsx'))
const MyLibraryPage = lazy(() => import('./pages/MyLibraryPage.jsx'))
const ToReadPage = lazy(() => import('./pages/ToReadPage.jsx'))
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))

function App() {

  return (
    <DarkModeProviderWrapper>      
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/search-books" element = {<SearchBooksPage />} />
          <Route path="/my-library" element = {<MyLibraryPage />} />
          <Route path="/to-read" element = {<ToReadPage />} />
          <Route path="/error" element = {<ErrorPage />} />
          {/* <Route path="/login" element = {<LoginPage />} /> */}
        </Routes>
      </Suspense>
    </DarkModeProviderWrapper>
  )
}

export default App
