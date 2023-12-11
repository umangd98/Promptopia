"use client"

import { useState, useEffect } from "react" 
import { useSession } from "next-auth/react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import Profile from "@components/Profile"

const UserProfile = () => {
    const {data:session} = useSession()
    const params = useParams()
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    const userId = params.id
    const [posts, setPosts] = useState([])
    const router = useRouter()
    useEffect(() => {
        const fetchPrompts = async () => {
          const res = await fetch(`/api/users/${userId}/posts`)
          const data = await res.json()
          setPosts(data)
          console.log({data})
        }
        if(userId)fetchPrompts()
        
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
    <div>
    {session?.user.id === userId ? (<Profile name="My" desc="Welcome to your personalised profile page"
    data = {posts} handleEdit = {handleEdit} handleDelete = {handleDelete} />) : (
        <Profile name={name} desc="Welcome to your personalised profile page"
   data = {posts} handleEdit = {() => {}} handleDelete = {() => {} } />
    )}
    </div>
    )
   
  
}

export default UserProfile