export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary-600 mb-4">
          FinLedger
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Modern accounting system with comprehensive financial management features
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-600 hover:bg-gray-50 transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  )
}