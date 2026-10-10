export type Sprint = {
  id: number
  projectId: number
  name: string
  goal: string
  status: 'Planned' | 'Active' | 'Completed'
  startDate: string
  endDate: string
}