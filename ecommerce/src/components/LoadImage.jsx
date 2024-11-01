import gift from '../assets/animate.gif'

function LoadImage() {
    return (
        <div className='load d-flex content-space-center content-align-items-center sticky'>
          <img className="" src={gift} alt="" />
        </div>
      )
}

export default LoadImage