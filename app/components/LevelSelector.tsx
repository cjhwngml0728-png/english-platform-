'use client'

interface LevelSelectorProps {
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
  onLevelChange: (level: 'beginner' | 'intermediate' | 'advanced') => void
}

export default function LevelSelector({ currentLevel, onLevelChange }: LevelSelectorProps) {
  const levels = [
    {
      id: 'beginner' as const,
      name: '초급 (Beginner)',
      description: '영어를 처음 시작하는 분들을 위한 레벨',
      icon: '🌱',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'intermediate' as const,
      name: '중급 (Intermediate)',
      description: '기본 회화가 가능한 분들을 위한 레벨',
      icon: '📚',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'advanced' as const,
      name: '고급 (Advanced)',
      description: '유창한 영어 실력을 원하는 분들을 위한 레벨',
      icon: '🎓',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">학습 레벨 선택</h2>
        <p className="text-gray-600 mb-6">자신의 영어 실력에 맞는 레벨을 선택해주세요</p>

        <div className="space-y-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => onLevelChange(level.id)}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                currentLevel === level.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center text-3xl`}>
                  {level.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {level.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{level.description}</p>
                </div>
                {currentLevel === level.id && (
                  <div className="text-primary-500 text-2xl">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">💡 레벨별 특징:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>초급:</strong> 기본 단어, 간단한 문장, 일상 회화</li>
            <li>• <strong>중급:</strong> 다양한 표현, 복잡한 문장, 비즈니스 영어</li>
            <li>• <strong>고급:</strong> 고급 어휘, 원어민 수준 표현, 전문 영어</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
