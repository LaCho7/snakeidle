import SnakeGame from '@/components/SnakeGame'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Snake Idle</h1>
        <p className="text-lg text-gray-300">
          Jouez au snake et accumulez des points même après votre mort !
        </p>
      </div>
      <SnakeGame />
    </main>
  )
}