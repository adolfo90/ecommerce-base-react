import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = props => {
  const { id, title, imageUrl, price, handleDelete } = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className='h-6 w-6 text-black cursor-pointer'></XMarkIcon>
  }

  return (
    <div className="flex justify-between items-center mb-3 gap-2">
      <div className='flex items-center gap-2 min-w-0 flex-1'>
        <figure className='w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-light truncate'>{title}</p>
      </div>
      <div className='flex items-center gap-2 flex-shrink-0'>
        <p className='text-base sm:text-lg font-medium'>{price}</p>
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard
