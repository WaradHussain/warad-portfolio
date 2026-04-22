'use client'

import { useState, useEffect } from 'react'

const WORDS = ['Python Engineer', 'AI Engineer', 'Backend Developer']
const TYPE_SPEED = 70
const DELETE_SPEED = 40
const PAUSE_MS = 1400

function useTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_MS)
    } else if (deleting && displayed === '') {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % WORDS.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayed(
          deleting
            ? current.slice(0, displayed.length - 1)
            : current.slice(0, displayed.length + 1)
        )
      }, deleting ? DELETE_SPEED : TYPE_SPEED)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return displayed
}

export default function Typewriter() {
  const typewriter = useTypewriter()

  return (
    <div className="mt-3 h-10 flex items-center">
      <span className="text-accent-green font-mono text-2xl">
        {typewriter}
        <span className="animate-pulse border-r-2 border-accent-green ml-0.5 inline-block h-6 align-middle" />
      </span>
    </div>
  )
}
