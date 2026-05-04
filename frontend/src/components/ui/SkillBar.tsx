'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/lib/types'

function colorFor(level: number) {
  if (level > 70) return '#C5003C'
  if (level >= 40) return '#F3E600'
  return '#55EAD4'
}

export default function SkillBar({ skill }: { skill: Skill }) {
  const color = colorFor(skill.level)
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between font-[var(--font-mono)] text-xs">
        <span className="text-cp-text">{skill.name}</span>
        <span style={{ color }}>{skill.level.toString().padStart(3, '0')}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: 'rgba(197,0,60,0.04)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  )
}
