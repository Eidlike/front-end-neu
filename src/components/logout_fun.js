/* eslint-disable no-unused-vars */
import'./header.css';
import { useCookies} from 'react-cookie';


export default function Logoutt(setuser) {
    const[Cookie,setCookies,removecookie]=useCookies(["AccessToken"]);

 const remove=async()=>{     
     removecookie("AccessToken");
    //  setuser(null)
     await window.location.reload();
    }
     return(
        
         <li onClick={remove}> log out</li>
     )
}
