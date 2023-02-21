
const FormError = ({ text }: { text: string }) => {
  return (
    <div>
      <span className='text-red-500 dark:text-red-300  p-1'>{text}</span>
    </div>
  )
}

export default FormError