export interface IOffer {
  id: string
  direction: string
  grade: string
  salaryMin: number
  salaryMax: number
  currency: string
  company: string
  vacancyLink: string
  techStack: string[]
  workFormat: string
  contactEmail?: string
  contactPhone?: string
  status: 'active' | 'inactive'
  location: string
  createdAt: string
  notes?: string
}
