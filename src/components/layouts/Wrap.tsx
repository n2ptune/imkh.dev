import { HEADER_HEIGHT } from '@/const'
import React from 'react'

const WrapLayout: React.FC = ({ children }) => {
  return (
    <section className="relative" style={{ top: HEADER_HEIGHT.size }}>
      {children}
    </section>
  )
}

export default WrapLayout
