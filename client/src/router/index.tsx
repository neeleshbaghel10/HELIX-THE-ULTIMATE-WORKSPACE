import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetails from '../pages/ProjectDetails'
import Tasks from '../pages/Tasks'
import Sprints from '../pages/Sprints'
import SprintDetails from '../pages/SprintDetails.tsx'
import Team from '../pages/Team'

import AppLayout from '../layouts/AppLayout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectDetails />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/sprints',
        element: <Sprints />,
      },
      {
        path: '/sprints/:sprintId',
        element: <SprintDetails />,
      },
      {
        path: '/team',
        element: <Team />,
      },
    ],
  },
])

export default router