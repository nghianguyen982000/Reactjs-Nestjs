import LogoUser from '../../Assets/img/logoUser.png'


const Header = () => {
  return (
    <div className='flex items-center justify-between p-[20px_50px] bg-[#f0eeee]'>
        <div className='border-solid border-2 border-[#969996] rounded-[20px] h-[40px] flex items-center overflow-hidden w-[300px] hover:shadow-[0_2px_3px_rgba(0,0,0,0.3)]'>
            <form  className='h-[100%] w-[100%]'>
                <input className='h-[100%] w-[100%] outline-transparent p-[5px_15px] bg-[#f0eeee]'  placeholder='Search courses' type="text" />
            </form>
        </div>
        <div>
            <div className='hidden bg-[#d6942a] flex items-center justify-center text-[16px] rounded-[20px] p-[2px_30px] text-[#fff] font-bold cursor-pointer hover:shadow-[0_2px_3px_rgba(0,0,0,0.3)]'>
                Login
            </div>
            <div className='flex items-center'>
                <div className='cursor-pointer'>Favorite</div>
                <div className='p-[0_20px] cursor-pointer' >Purchased</div>
                <div className='overflow-hidden w-[40px] h-[40px] rounded-[20px] border-[1px] border-solid border-[#c2b9b9] flex cursor-pointer justify-center items-center'>
                    <img src={LogoUser} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header