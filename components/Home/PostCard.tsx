import Image from 'next/image'
import Logo from '../../public/logo.png'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'

const styles = {
  wrapper: `flex max-w-[46rem] h-[10rem] items-center gap-[1rem] cursor-pointer`,
  authorContainer: `flex gap-[1.4rem]`,
  authorImageContainer: `grid place-items-center rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  authorImage: `object-cover`,
  authorName: `font-semibold`,
  title: `font-bold text-2xl`,
  briefing: `text-[#787878]`,
  detailsContainer: `flex items-center justify-between text-[#787878]`,
  articleDetails: `my-2 text-[8.rem]`,
  category: `bg-[#F2F3F4] p-1 rounded-full cursor-pointer`,
  bookmarkContainer: `cursor-pointer`,
  thumbnailContainer: ``,
  postDetails: `flex-[2.5] flex flex-col`,
}
const PostCard = () => {
  return (
    <Link href={`/varun/123`} prefetch>
    <div className={styles.wrapper}>
      <div className={styles.postDetails}>
        <div className={styles.authorContainer}>
          <div className={styles.authorImageContainer}>
            <Image
              src={Logo}
              className={styles.authorImage}
              width={40}
              height={40}
              alt='dp'
            />
          </div>
          <div className={styles.authorName}>UserName</div>
        </div>
        <h1 className={styles.title}>NodeJS 20 is HERE! 10 Features that will blow your mind!</h1>
        <div className={styles.briefing}>Welcome to the Node.js 20 Party!</div>
        <div className={styles.detailsContainer}>
          <span className={styles.articleDetails}>Date • ReadTime • <span className={styles.category}>Genre</span></span>
          <span className={styles.bookmarkContainer}>
            <Bookmark className='h-5 w-5' />
          </span>
        </div>
      </div>
      <div className={styles.thumbnailContainer}>
        <Image
          src={Logo}
          height={100}
          width={100}
          alt='thumbnail'
        />
      </div>
    </div>
    </Link>
  )
}
export default PostCard