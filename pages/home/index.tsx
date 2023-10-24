import Banner from "@/components/Home/Banner";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Navbar/Navbar";

const styles = {
  postList: `flex flex-col gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg: grid-cols-3`,
  main: `flex justify-center mt-[60px] font-semibold`,
  wrapper: `mx-auto h-screen`,
};
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar buttonText="Sign in/register" status="navbar" />
      <Banner />
      <div className={styles.main}>To get started ,Please Sign in with us</div>
      <Footer />
    </div>
  );
};
export default Home;
