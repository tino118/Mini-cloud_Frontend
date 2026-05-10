import Link from 'next/link'
export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 text-center'>
      <h2 className='text-4xl font-bold text-gray-900'>404</h2>
      <p className='mt-2 text-lg text-gray-600'>Oups ! Cette page n'existe pas.</p>
      <Link href='/' className='mt-6 rounded-lg bg-[#1a73e8] px-6 py-2 text-white hover:bg-[#1557b0] transition-colors shadow-sm'>
        Retour à l'accueil
      </Link>
    </div>
  )
}
