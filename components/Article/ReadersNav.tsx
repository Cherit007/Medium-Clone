import Image from 'next/image';
import Link from 'next/link';
import { Home, Bell, Bookmark, PenSquare, Newspaper } from 'lucide-react'
import smallLogo from '../../public/mediumlogo.png'

const styles = {
  wrapper: `w-[5rem] h-screen flex flex-col justify-between items-center p-[1rem]`,
  logoContainer: `cursor-pointer`,
  iconsContainer: `flex-1 flex flex-col justify-center gap-[1.4rem] text-2xl text-[#787878]`,
  divider: `border-b`,
  profileImage: `object-container `,
  profileImageContainer: `w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden place-items-center`,

}
const ReadersNav = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image
            src={smallLogo}
            alt='logo'
            height={40}
            width={40}
          />
        </div>
      </Link>
      <div className={styles.iconsContainer}>
        <Home className='icon' />
        <Bell className='icon' />
        <Bookmark className='icon' />
        <Newspaper className='icon' />
        <div className={styles.divider} />
        <PenSquare className='icon' />
      </div>
      <div className={styles.profileImageContainer}>
        <Image
          className={styles.profileImage}
          src={smallLogo}
          alt='dp'
        />
      </div>
    </div>
  )
}
export default ReadersNav