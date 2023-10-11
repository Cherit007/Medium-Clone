import Image from 'next/image';
import Logo from '../../public/logo.png'
const Banner = () => {
  const styles = {
    wrapper: "h-max-[10rem] flex items-center justify-center bg-[#FEC016] border-y border-black",
    content: "max-w-7xl flex-1 flex items-center justify-between",
    tagline: "space-y-5 p-5 px-10 flex-3",
    accentedButton: "bg-black text-white py-2 px-4 rounded-full",
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.tagline}>
          <h1 className='max-w-xl text-[6rem] font-mediumSerif' >Wisdom Preserved.</h1>
          <h3 className="text-2xl">Capture Your Mind, Share Your Voice</h3>
          <button className={styles.accentedButton}>Start Reading</button>
        </div>
        <Image
            className='hidden h-32 md:inline-flex object-contain flex-1'
            src={Logo}
            width={500}
            height={400}
            alt="banner"
          />
      </div>
    </div>
  )
}
  
export default Banner