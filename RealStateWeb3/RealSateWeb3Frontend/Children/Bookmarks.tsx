import React from 'react'
import  { SignerChildrenProps } from './SignerChildren'
import { BookmarksApi } from '../ContextApi/Bookmarks'

const Bookmarks = ({children} :SignerChildrenProps) => {
    const [bookmarksData , setBookmarksData] = React.useState({})
const fetchBookmarks = ()=>{
    let res = localStorage.getItem("Bookmark")
    if(!res){
        setBookmarksData({})
       return;
    }
    let data = JSON.parse(res)
  setBookmarksData(data)
}
    React.useEffect(()=>{
        fetchBookmarks()
    },[])
    const value = {
        bookmarksData,
        fetchBookmarks
    }
  return (
    <BookmarksApi.Provider value={value}>
        {children}
    </BookmarksApi.Provider>
  )
}

export default Bookmarks