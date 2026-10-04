export type Project = {
  id: number
  name: string
  description: string
  tasks: number
  status: 'Active' | 'Completed'
}