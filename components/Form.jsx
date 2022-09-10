import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { handlePostState } from '../atoms/postAtom'

const Form = () => {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)



  // console.log(input)

  const uploadPost = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        input: input,
        photoUrl: photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setHandlePost(true)
    setModalOpen(false)
  }

  return (
    <form className="relative flex flex-col space-y-2 text-black/80 dark:text-white/75">
      <textarea
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        rows="4"
        placeholder="Sobre o que você quer falar?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        className="max-w-xs truncate bg-transparent focus:outline-none md:max-w-sm dark:placeholder-white/75"
        placeholder="Adicionar um URL de foto (opcional)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        type="submit"
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:cursor-not-allowed disabled:text-black/40 disabled:bg-white/75 text-white rounded-full px-3.5 py-1"
        onClick={uploadPost}
        disabled={!input.trim() && !photoUrl.trim()}
      >
        Post
      </button>
    </form>
  )
}

export default Form
