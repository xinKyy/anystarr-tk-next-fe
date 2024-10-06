import {useSelector} from "react-redux";


const useLogin = () =>{

  const userInfo = useSelector(state => state.home.userInfo.userInfo);


  return {
    needLogin:!userInfo?.displayName
  };

};

export default useLogin;
