'use client'

export default function ImageTest() {
  return (
    <div className="p-8 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Test d'images</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h3 className="text-lg mb-2">Pomme:</h3>
          <img
            src="/Graphics/apple.png"
            alt="Apple"
            className="w-16 h-16 mx-auto border border-gray-600"
            onError={(e) => {
              console.error('Erreur loading apple.png');
              console.log('Current src:', e.currentTarget.src);
            }}
            onLoad={() => {
              console.log('Apple loaded successfully');
            }}
          />
        </div>

        <div className="text-center">
          <h3 className="text-lg mb-2">Tête droite:</h3>
          <img
            src="/Graphics/head_right.png"
            alt="Head Right"
            className="w-16 h-16 mx-auto border border-gray-600"
            onError={(e) => {
              console.error('Erreur loading head_right.png');
              console.log('Current src:', e.currentTarget.src);
            }}
            onLoad={() => {
              console.log('Head right loaded successfully');
            }}
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>URL de test: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
        <p>Chemin complet de la pomme: {typeof window !== 'undefined' ? `${window.location.origin}/Graphics/apple.png` : 'N/A'}</p>
      </div>
    </div>
  )
}