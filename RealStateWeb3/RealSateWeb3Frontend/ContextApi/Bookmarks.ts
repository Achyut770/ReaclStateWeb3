import { createContext } from "react";
interface BookmarkApi{
    bookmarksData:any
    fetchBookmarks:()=> void
}

export const BookmarksApi = createContext<null | BookmarkApi>(null)