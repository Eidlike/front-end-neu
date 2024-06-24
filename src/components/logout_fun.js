import {useNavigate } from 'react-router';
import'./header.css';
import { useCookies} from 'react-cookie';


export default function Logoutt({setuser}) {
    const [,, removeCookie] = useCookies(["AccessToken"]);
    const navigate = useNavigate()
 const remove= ()=>{  
 removeCookie("AccessToken" ,{path:"/"});  
    navigate('/')
    }
     return(
         <li onClick={remove}> log out</li>
     )
}
