import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function TopologyProject() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the main content of the topology project
    router.replace('/topo-book/introduction')
  }, [router])
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      <p>Loading Topological Instrumentality Project...</p>
    </div>
  )
} 