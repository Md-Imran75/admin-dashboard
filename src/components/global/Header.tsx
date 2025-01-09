import { ModeToggle } from '@/features/theme/components/mode-toggle'

const Header = () => {
    return (
        <div className='flex justify-between items-center bg-primary-foreground  mb-5 rounded-md py-3 px-2 md:px-5'>
            <div>
                <ModeToggle/>
            </div>
            <div className='text-center font-bold'>
                {
                    new Date().getHours() < 12 ? 'Good Moring' : new Date().getHours() < 18 ? 'Good Afternoon' : new Date().getHours() < 20 ? 'Good Evening' : 'Good Night'
                }
            </div>
            <div className='text-center font-bold flex  gap-5'>
                <div>
                    {
                        new Date().toLocaleDateString()
                    }
                </div>
                <div>
                    {
                        new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()
                    }
                    {
                        new Date().getTime() < 12 ? 'AM' : 'PM'
                    }
                </div>

            </div>
        </div>
    )
}

export default Header