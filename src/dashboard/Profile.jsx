import useAuth from '../hooks/useAuth'
import useAdmin from '../hooks/useAdmin'
import img from '../assets/pngwing.com.png'
const Profile = () => {
  const { user, loading } = useAuth() || {}
  const [isAdmin, isAdminLoading] = useAdmin()

  console.log(user)
  if (isAdminLoading || loading) return <span className="loading loading-spinner loading-lg"></span>
//   if ( loading) return <span className="loading loading-spinner loading-lg"></span>
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://images.pexels.com/photos/3367931/pexels-photo-3367931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={img}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-#0e7673-400 rounded-full'>
            {isAdmin ? 'Admin' : 'User'}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName }
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile