import Image from 'next/image'
import smallLogo from '../../public/mediumlogo.png'
import { PlayCircle, Twitter, Facebook, Linkedin, Link, Bookmark, MoreHorizontal } from 'lucide-react'

const styles = {
  wrapper: `flex items-center justify-center flex-[3] border-l border-r`,
  content: `h-screen w-full p-[2rem]`,
  articleHeaderContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[0.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem]`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1.4rem] text-[#292929]`,
  articleText: `font-mediumSerif text-[1.4rem] text-[#292929]`,
}
const ArticleMain = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.articleHeaderContainer}>
          <div className={styles.authorContainer}>
            <div className={styles.authorImageContainer}>
              <Image
                className="object-cover"
                src={smallLogo}
                width={100}
                height={100}
                alt="author"
              />
            </div>
            <div className={styles.column}>
              <div>Varun Mokra</div>
              <div className={styles.postDetails}>
                <span>Date • ReadTime • </span><span className={styles.listenButton}><PlayCircle />Listen</span>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <Twitter />
            <Facebook />
            <Linkedin />
            <Link />
            <div className={styles.space} />
            <Bookmark />
            <MoreHorizontal />
          </div>
        </div>
        <div className={styles.articleMainContainer}>
          <div className={styles.bannerContainer}>
            <Image
              className='object-contain'
              src={smallLogo}
              alt="banner"
              height={100}
              width={100}
            />
          </div>
          <h1 className={styles.title}>The Art of Writing Keynotes</h1>
          <h4 className={styles.subtitle}>
            <div>
              Varun Mokra, September 13, 2022
            </div>
            <div>Brief: ShortNotes</div>
          </h4>
          <div className={styles.articleText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleMain