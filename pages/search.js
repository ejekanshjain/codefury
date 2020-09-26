import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const Search = () => {
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState('')
    const searchTextRef = useRef()
    const handleSearch = e => {
        e.preventDefault()
        if (searchTextRef.current.value) {
            setSearchText(searchTextRef.current.value)
        } else {
            setSearchText('')
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchText) fetch(`http://localhost:5000/posts?search=${searchText}`)
                .then(res => res.json())
                .then(json => {
                    if (json.data && json.data.posts) setSearchResults(json.data.posts)
                    else setSearchResults([])
                })
                .catch(console.log)
            else setSearchResults([])
        }, 500)
        return () => clearTimeout(timeout)
    }, [searchText])
    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" name="searchText" ref={searchTextRef} onChange={handleSearch} />
                <button type="submit">Search</button>
            </form>
            {searchResults.map(searchRes =>
                <div key={searchRes._id}>
                    <p>{searchRes.title}</p>
                    <Link href={'/blog/' + searchRes.id}><a>Read more</a></Link>
                </div>
            )}
        </>
    )
}

export default Search