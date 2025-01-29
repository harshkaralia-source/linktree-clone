import Button from '@/components/Button'
import Home from '@/components/Home'

const Page = () => {
  return (
    <main className=''>
      <Home />
      <section className='grid grid-cols-1 lg:grid-cols-2 h-screen bg-[#e9c0ea] pt-64 px:5 sm:px-10 lg:px-24'>
        <div className="flex items-start justify-center">
          {/* IMAGE HERE */}
        </div>

        <div className="">
          <h1 className="font-[800] text-6xl py-3 text-[#4f2273]">
            Create and customize your Linktree in minutes
          </h1>
          <p className="text-lg py-3 text-[#4f2273]">
            Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.
          </p>

          <div className="my-7">
          <Button
            title='Contact the developer'
            style='btn_purple'
          />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
