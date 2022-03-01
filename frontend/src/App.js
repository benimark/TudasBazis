import {useDispatch} from "react-redux"
import { useEffect } from "react";
import { isLoggedIn } from "./Redux/Actions/UserActions";
import { getMenu } from "./Redux/Actions/EnvActions";
import Admin from "./Components/Admin/Admin";
import External from "./Components/External/External"

function App() {
  return (
    <div>
      {window.location.hostname.split(".")[0]==="admin"?
        <Admin/>
        :
         <External/>
      }
    </div>
  );
}

export default App;
