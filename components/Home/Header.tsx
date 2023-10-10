import Image from 'next/image';
import logo from '../../public/logo.png';
import { Bell } from 'lucide-react';

const Header = () => {
  const styles = {
    wrapper: "flex justify-center gap-10 p-5 bg-[]",
    content: "max-w-7xl flex-1 flex justify-between gap-10",
    logoContainer: "flex items-center flex-start ",
    logo: "cursor-pointer object-contain",
    bannerNav: "flex cursor-pointer items-center space-x-5",
    notification: "cursor-pointer object-contain",
    accentedButton: "bg-black text-white py-2 px-4 rounded-full",
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image 
            className= {styles.logo}
            src={logo}
            height={40}
            width={200}
            alt="logo"
            />
        </div>
        <div className={styles.bannerNav}>
          <div>Sign In</div>
          <div>Membership</div>
          <div>
            <Bell />
          </div>
          <div className={styles.accentedButton}>Get Started</div>
        </div>
      </div>
    </div>
  )
}
  
export default Header