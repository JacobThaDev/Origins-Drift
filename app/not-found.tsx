export default function NotFound() {
  return (
    <div className="flex w-full h-full items-center justify-center">

        <div className='flex gap-4'>
            <p className="font-black text-3xl">404</p>
            <div className="w-[1px] bg-border"></div>
            <div className="flex items-center justify-center">
                <p>Not found</p>
            </div>
        </div>
        
    </div>);
}