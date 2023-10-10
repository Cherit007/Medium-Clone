import Header from "@/components/Home/Header";
import Banner from "@/components/Home/Banner";
import PostCard from "@/components/Home/PostCard";

const styles = {
  postList : `flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg: grid-cols-3`,
  container: `max-w-7xl flex-1`,
  main: `flex justify-center`,
  wrapper:  `mx-auto`,
}
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Banner />
      <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.postList}>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      </div>
    </div>
  );
}
export default Home;