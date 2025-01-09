import CardCom from './components/CardCom'
import Chart from './components/Chart'

const DashBoard = () => {
  return (
    <div className='pb-20'>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
      <CardCom title='Lifetime Sales' data={2656564} />
      <CardCom title='Total Users' data={2656564} />
      <CardCom title='Total Sellers' data={2656564} />
      <CardCom title='Total Managers' data={2656564} />
      <CardCom title='Total Technician' data={2656564} />
      <CardCom title='Total Bikes' data={2656564} />
      <CardCom title='Total Accessories' data={2656564} />
      <CardCom title='Total Withdraw Requests' data={2656564} />
      </div>
      <div className='mt-10 grid grid-cols-1  lg:grid-cols-2 gap-5'>
        <Chart/>
        <Chart/>
      </div>
    </div>
  )
}

export default DashBoard