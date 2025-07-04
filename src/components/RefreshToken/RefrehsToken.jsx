import { useDispatch } from "react-redux";
import { refreshToken } from "../../redux/auth/operations";
import css from './RefreshToken.module.css'

const RefreshButton = () => {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(refreshToken());
  };

    return <button className={css.button} onClick={handleRefresh}>Refresh Token</button>;
};

export default RefreshButton;
