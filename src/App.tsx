import { ModeToggle } from "./features/theme/components/mode-toggle"
import { UserManagement } from "./features/user-management"


function App() {


  return (
    <>
   <div className='max-w-4xl mx-auto'>
   <ModeToggle/>
   <UserManagement/>
   </div>
    </>
  )
}

export default App
