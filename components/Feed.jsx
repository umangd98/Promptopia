"use client"

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { set } from 'mongoose'


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt, index) => (
        <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const handleTagClick = (tag) => {
      setSearchText(tag)
      const filteredPostsList = posts.filter((post) => {
        if(post.tag.toLowerCase().includes(tag.toLowerCase())) {
          return post
        }
      })
    setFilteredPosts(filteredPostsList)

  }
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    // console.log('searchText' + e.target.value)
    const filteredPostsList = posts.filter((post) => {
      if(post.prompt.toLowerCase().includes((e.target.value).toLowerCase()) || post.tag.toLowerCase().includes((e.target.value).toLowerCase()) || post.creator.username.toLowerCase().includes((e.target.value).toLowerCase())) {
        return post
      }
    })
    // console.log('filtered posts' + {filteredPostsList})
    
    setFilteredPosts(filteredPostsList)
  }
  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
      setFilteredPosts(data)

      // console.log('posts', {data})
    }
    fetchPrompts()
    
  }, [])
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder='Search for tag or username' value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      {filteredPosts.length > 0 && <PromptCardList data={filteredPosts} handleTagClick={handleTagClick}/>}
      
    </section>
  )
}

export default Feed