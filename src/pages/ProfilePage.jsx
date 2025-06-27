import Container from "../components/container/container.jsx";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";
import ProfileNavigation from "../components/ProfileNavigation/ProfileNavigation.jsx";
import RecipesList from "../components/RecipesList/RecipesList.jsx";
import style from "../components/ProfileNavigation/ProfileNavigation.module.css"

export default function ProfilePage() {
  return (
    <div style={{paddingTop: "46px", paddingBottom: "46px", backgroundColor:  "#fbfcf8"}}><Container >
      <h1 style={{ color:"#000", fontWeight: '16px', fontSize: "40px" }}>Profile page</h1>
      <ProfileNavigation />
      <p className={style.totalRecipes}>total recipes number</p>
      <RecipesList/>
      <LoadMoreBtn/>
    </Container></div>
  );
}
