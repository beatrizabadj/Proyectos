import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import { DarkModeProviderWrapper } from './context/theme.context.jsx'
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const SearchBooksPage = lazy(() => import('./pages/SearchBooksPage.jsx'))
const MyLibraryPage = lazy(() => import('./pages/MyLibraryPage.jsx'))
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
import SidebarMenu from './components/SidebarMenu.jsx'
function App() {

  return (
    <DarkModeProviderWrapper>      
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element = {<HomePage />} />
          <Route path="/search-books" element = {<SearchBooksPage />} />
          <Route path="/my-library" element = {<MyLibraryPage />} />
          <Route path="/error" element = {<ErrorPage />} />
          {/* <Route path="/login" element = {<LoginPage />} /> */}
        </Routes>
      </Suspense>
    </DarkModeProviderWrapper>
  )
}

export default App
