import gift from '../assets/animate.gif'

function LoadGif() {
  return (
    <div className='load d-flex content-space-center content-align-items-center sticky'>
      <img className="" src={gift} alt="" />
    </div>
  )
}

export default LoadGif