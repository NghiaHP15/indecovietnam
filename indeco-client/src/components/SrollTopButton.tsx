'use client'

import { useEffect, useState, useCallback } from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300) // hiện khi cuộn > 300px
    }

    // chạy lần đầu (nếu trang đã cuộn sẵn)
    if (typeof window !== 'undefined') onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = useCallback(() => {
    // tôn trọng reduced-motion nếu người dùng bật
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
      aria-label="Trở lên đầu trang"
      title="Lên đầu trang"
      className="
        fixed right-5 bottom-6 z-50
        flex items-center justify-center
        w-11 h-11 rounded-lg
        shadow-lg ring-1 ring-black/10
        backdrop-blur-sm
        hover:scale-105 active:scale-95 transition-transform
        bg-white/90 dark:bg-gray-900/80
      "
    >
      {/* Icon mũi tên lên — SVG nhỏ */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill="#c59672" />
      </svg>
    </button>
  )
}
