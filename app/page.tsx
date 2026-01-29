'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCENES, BACKGROUNDS, Scene } from '@/lib/story'
import { useProgress } from '@/lib/useProgress'

export default function Home() {
  const { progress, isLoaded, goToScene, completeEnding, resetProgress } = useProgress()
  const [currentScene, setCurrentScene] = useState<Scene | null>(null)
  const [showStats, setShowStats] = useState(false)
  const [tg, setTg] = useState<any>(null)

  // Initialize Telegram WebApp
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const WebApp = (window as any).Telegram?.WebApp
      if (WebApp) {
        WebApp.ready()
        WebApp.expand()
        WebApp.enableClosingConfirmation()
        setTg(WebApp)
        
        // Set theme colors
        WebApp.setHeaderColor('#0a0e1a')
        WebApp.setBackgroundColor('#050810')
      }
    }
  }, [])

  // Load current scene
  useEffect(() => {
    if (isLoaded) {
      const scene = SCENES[progress.currentScene]
      if (scene) {
        setCurrentScene(scene)
        
        // Complete ending if this is an ending scene
        if (scene.isEnding && !progress.completedEndings.includes(scene.id)) {
          completeEnding(scene.id)
          
          // Haptic feedback for ending
          tg?.HapticFeedback?.notificationOccurred('success')
        }
      }
    }
  }, [progress.currentScene, isLoaded, completeEnding, progress.completedEndings, tg])

  const handleChoice = (choiceId: string, nextScene: string) => {
    // Haptic feedback
    tg?.HapticFeedback?.impactOccurred('light')
    
    goToScene(nextScene, choiceId)
  }

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите начать заново? Весь прогресс будет удалён.')) {
      tg?.HapticFeedback?.notificationOccurred('warning')
      resetProgress()
    }
  }

  if (!isLoaded || !currentScene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-novel-darker">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-novel-accent border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-novel-accent font-display text-xl tracking-[0.2em]">
            ЗАГРУЗКА...
          </p>
        </motion.div>
      </div>
    )
  }

  const background = BACKGROUNDS[currentScene.background] || BACKGROUNDS.forest

  return (
    <div className={`min-h-screen relative overflow-hidden ${background}`}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-novel-accent/[0.03] via-transparent to-novel-accent-dark/[0.04] animate-pulse pointer-events-none" />
      
      {/* Decorative corners */}
      <div className="corner-decor corner-decor-tl" />
      <div className="corner-decor corner-decor-tr" />
      <div className="corner-decor corner-decor-bl" />
      <div className="corner-decor corner-decor-br" />

      {/* Stats button */}
      <motion.button
        className="absolute top-4 right-20 z-50 px-4 py-2 bg-novel-dark/80 border border-novel-accent-dark rounded text-novel-accent text-sm font-display hover:bg-novel-dark transition-colors"
        onClick={() => setShowStats(!showStats)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        📊 Статистика
      </motion.button>

      {/* Reset button */}
      <motion.button
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-novel-dark/80 border border-novel-accent-dark rounded text-novel-accent text-sm font-display hover:bg-novel-dark transition-colors"
        onClick={handleReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🔄 Сброс
      </motion.button>

      {/* Stats panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            className="absolute top-16 right-4 z-50 w-64 p-6 bg-novel-dark/95 border-2 border-novel-accent rounded shadow-2xl backdrop-blur-md"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <h3 className="font-display text-novel-accent text-lg mb-4">Статистика</h3>
            <div className="space-y-2 text-sm">
              <p className="text-novel-text-dim">
                Посещено сцен: <span className="text-novel-accent">{progress.visitedScenes.length}</span>
              </p>
              <p className="text-novel-text-dim">
                Сделано выборов: <span className="text-novel-accent">{progress.choices.length}</span>
              </p>
              <p className="text-novel-text-dim">
                Найдено концовок: <span className="text-novel-accent">{progress.completedEndings.length}/3</span>
              </p>
              
              {progress.completedEndings.length > 0 && (
                <div className="mt-4 pt-4 border-t border-novel-accent-dark">
                  <p className="text-novel-text-dim mb-2">Достигнутые концовки:</p>
                  <ul className="space-y-1 text-xs">
                    {progress.completedEndings.map(ending => (
                      <li key={ending} className="text-novel-accent">✓ {ending}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Narrative text (chapter/ending title) */}
              {currentScene.narrativeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <h2 className="font-display text-3xl md:text-4xl text-novel-accent tracking-widest mb-2">
                    {currentScene.narrativeText}
                  </h2>
                  <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-novel-accent to-transparent opacity-50" />
                </motion.div>
              )}

              {/* Character section */}
              {currentScene.character && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="character-frame px-10 py-5">
                    <h2 className="font-display text-2xl md:text-3xl text-novel-accent text-center tracking-wide text-shadow-lg">
                      {currentScene.character}
                    </h2>
                  </div>
                </motion.div>
              )}

              {/* Dialog box */}
              <motion.div
                className="dialog-box p-8 md:p-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-lg md:text-xl leading-relaxed text-novel-text text-justify relative z-10">
                  {currentScene.text}
                </p>
              </motion.div>

              {/* Choices */}
              {currentScene.choices.length > 0 && (
                <motion.div
                  className="space-y-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentScene.choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      className="choice-btn w-full text-left group"
                      onClick={() => handleChoice(choice.id, choice.next)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl text-novel-accent transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      <span className="flex-1 text-base md:text-lg">
                        {choice.text}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Ending screen */}
              {currentScene.isEnding && (
                <motion.div
                  className="dialog-box p-8 md:p-12 text-center space-y-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2 className="font-display text-4xl md:text-5xl text-novel-accent tracking-[0.15em] animate-glow">
                    КОНЕЦ
                  </h2>
                  
                  {progress.completedEndings.length === 3 && (
                    <motion.p
                      className="text-novel-accent text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      🎉 Поздравляем! Вы нашли все 3 концовки!
                    </motion.p>
                  )}
                  
                  <motion.button
                    className="px-10 py-4 bg-gradient-to-r from-novel-accent-dark to-novel-accent border-2 border-novel-accent rounded text-novel-dark font-display text-lg tracking-wide shadow-lg shadow-novel-accent/30 hover:shadow-xl hover:shadow-novel-accent/40 transition-all"
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    НАЧАТЬ ЗАНОВО
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
