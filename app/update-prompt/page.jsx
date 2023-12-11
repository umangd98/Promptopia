"use client"
import Form from "@components/Form"
import { useEffect, useState } from "react"

import { useRouter, useSearchParams } from "next/navigation";


const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false )
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  const router = useRouter()
  
  useEffect(() => {
    const getPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`)
        const data = await res.json()
        setPost({
            prompt: data.prompt,
            tag: data.tag
            })
      
    }
    if(promptId)getPromptDetails()

  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()
    if(!promptId) return alert('Prompt ID not found')
    setSubmitting(true)
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
      
      }) 
      if(res.ok) {
        router.push('/')
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }
  return (
    <Form type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />
  )
}

export default UpdatePrompt