import { TailSpin} from  'react-loader-spinner'


 const Loader = () => (
<TailSpin
  height="80"
  width="80"
  color="#3f51b5"
  ariaLabel="tail-spin-loading"
  radius="3"
  wrapperStyle={{margin: '0 auto'}}
  wrapperClass=''
  visible={true}
/>
)
export default Loader