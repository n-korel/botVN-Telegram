'use client'

import { useState, useEffect } from 'react'
import { Progress } from './story'

const STORAGE_KEY = 'visual_novel_progress'

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({
    currentScene: 'prologue',
    choices: [],
    visitedScenes: ['prologue'],
    completedEndings: [],
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (newProgress: Partial<Progress>) => {
    const updated = { ...progress, ...newProgress }
    setProgress(updated)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  // Move to next scene
  const goToScene = (sceneId: string, choiceId?: string) => {
    const newChoices = choiceId ? [...progress.choices, choiceId] : progress.choices
    const newVisitedScenes = progress.visitedScenes.includes(sceneId)
      ? progress.visitedScenes
      : [...progress.visitedScenes, sceneId]

    saveProgress({
      currentScene: sceneId,
      choices: newChoices,
      visitedScenes: newVisitedScenes,
    })
  }

  // Mark ending as completed
  const completeEnding = (endingId: string) => {
    if (!progress.completedEndings.includes(endingId)) {
      saveProgress({
        completedEndings: [...progress.completedEndings, endingId],
      })
    }
  }

  // Reset progress
  const resetProgress = () => {
    const fresh: Progress = {
      currentScene: 'prologue',
      choices: [],
      visitedScenes: ['prologue'],
      completedEndings: [],
    }
    setProgress(fresh)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    } catch (error) {
      console.error('Failed to reset progress:', error)
    }
  }

  return {
    progress,
    isLoaded,
    goToScene,
    completeEnding,
    resetProgress,
    saveProgress,
  }
}
