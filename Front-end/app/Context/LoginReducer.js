const loginReducer = (prevState, action) =>{
    switch(action.type)
    {
      case 'RetrieveToken':
        return{
          ...prevState,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Login':
        return{
          ...prevState,
          userName : action.userName,
          userPhoto : action.userPhoto,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Logout':
        return{
          ...prevState,
          userName : null,
          userToken : null,
          userPhoto : null
        };
      case 'Register':
        return{
          ...prevState,
          userName : action.userName,
          userPhoto : action.userPhoto,
          userToken : action.userToken,
          isLoading : false
        };
    }
}
const initialLoginState = {
isLoading : true,
userName : null,
userToken : null,
userPhoto : null
}
export {loginReducer, initialLoginState};