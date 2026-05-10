'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log l'erreur dans un service externe si nécessaire
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600">Une erreur est survenue</h2>
      <p className="mt-2 text-gray-600">Nous sommes désolés pour ce désagrément.</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  )
}
