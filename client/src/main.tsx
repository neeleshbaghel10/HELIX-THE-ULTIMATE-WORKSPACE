import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

import router from './router'

import { ProjectProvider } from './context/ProjectContext'
import { TaskProvider } from './context/TaskContext'
import { SprintProvider } from './context/SprintContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <TaskProvider>
        <SprintProvider>
          <RouterProvider router={router} />
        </SprintProvider>
      </TaskProvider>
    </ProjectProvider>
  </StrictMode>,
)