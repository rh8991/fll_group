import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface TeamMember {
  name: string
  role: string
}

interface ContentState {
  aboutText: string
  problemText: string
  solutionText: string
  implementationText: string
  companyLink: string
  teamMembers: TeamMember[]
}

interface ContentContextType extends ContentState {
  updateContent: (key: keyof ContentState, value: string | TeamMember[]) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return context
}

interface ContentProviderProps {
  children: ReactNode
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ContentState>({
    aboutText: '',
    problemText: '',
    solutionText: '',
    implementationText: '',
    companyLink: '',
    teamMembers: Array(10).fill({ name: '', role: '' })
  })

  useEffect(() => {
    // Load from localStorage
    const loadedContent: Partial<ContentState> = {}
    
    const aboutText = localStorage.getItem('aboutText')
    const problemText = localStorage.getItem('problemText')
    const solutionText = localStorage.getItem('solutionText')
    const implementationText = localStorage.getItem('implementationText')
    const companyLink = localStorage.getItem('companyLink')

    if (aboutText) loadedContent.aboutText = aboutText
    if (problemText) loadedContent.problemText = problemText
    if (solutionText) loadedContent.solutionText = solutionText
    if (implementationText) loadedContent.implementationText = implementationText
    if (companyLink) loadedContent.companyLink = companyLink

    const teamMembers: TeamMember[] = []
    for (let i = 1; i <= 10; i++) {
      const member = localStorage.getItem(`member${i}`)
      if (member) {
        const [name, role] = member.split(':')
        teamMembers.push({ name: name || '', role: role || '' })
      } else {
        teamMembers.push({ name: '', role: '' })
      }
    }
    loadedContent.teamMembers = teamMembers

    setContent(prev => ({ ...prev, ...loadedContent }))
  }, [])

  const updateContent = (key: keyof ContentState, value: string | TeamMember[]) => {
    setContent(prev => ({ ...prev, [key]: value }))
    
    if (key === 'teamMembers' && Array.isArray(value)) {
      value.forEach((member, index) => {
        localStorage.setItem(`member${index + 1}`, `${member.name}:${member.role}`)
      })
    } else if (typeof value === 'string') {
      localStorage.setItem(key, value)
    }
  }

  return (
    <ContentContext.Provider value={{ ...content, updateContent }}>
      {children}
    </ContentContext.Provider>
  )
}
