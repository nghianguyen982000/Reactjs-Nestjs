import imgCourse from '../../Assets/img/imgCourse.png'
import { useNavigate } from 'react-router-dom'

const ItemCourse = () => {
  const navigate=useNavigate()
  return (
    <div className='flex-[23%] max-w-[23%] m-[10px]'>
      <div className='flex items-center justify-center relative bg-top bg-cover bg-no-repeat pt-[60%] rounded-[10px]' style={{backgroundImage:`url(${imgCourse})`}}>
        <div className='absolute top-[50%] bg-[#fff] p-[10px_15px] shadow-[0_2px_5px_rgba(0,0,0,0.5)] rounded-[25px] text-[#222222] cursor-pointer'onClick={() => navigate('/detail')}>
            View course
        </div>
      </div>
      <div>
        React JS cơ bản
      </div>
    </div>
  )
}

export default ItemCourse