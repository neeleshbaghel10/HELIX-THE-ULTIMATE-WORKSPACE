export type Task = {
  id: number
  projectId: number
  sprintId: number | null
  title: string
  description: string
  status: 'Todo' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
}