"use client"

import { useState, useEffect } from "react" 
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
    const {data:session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()
    useEffect(() => {
        const fetchPrompts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPosts(data)
          console.log({data})
        }
        if(session?.user.id)fetchPrompts()
        
      }, [])
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if(hasConfirmed) {
            try {
                const res = await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE'
                })
                if(res.ok) {
                    const newPosts = posts.filter((p) => p._id !== post._id)
                    setPosts(newPosts)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
   <Profile name="My" desc="Welcome to your personalised profile page"
   data = {posts} handleEdit = {handleEdit} handleDelete = {handleDelete} />
  )
}

export default MyProfile