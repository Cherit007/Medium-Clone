import ReadersNav from "../../../components/Article/ReadersNav";
import Recommendations from "../../../components/Article/Recommendations"
import ArticleMain from "../../../components/Article/ArticleMain";
const styles = {
  content: `flex`,
}
const Article = () => {
  return (
    <div className={styles.content}>
      <ReadersNav />
      <ArticleMain />
      <Recommendations />
    </div>
  )
}
export default Article