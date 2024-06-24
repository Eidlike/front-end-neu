import Header from '../../components/header'
import  './../../pages/css files/home_page.css'
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export default function HomePage(){
return<>
    <Header></Header>
<div className='contentt'>
    <div className='left'>   <h1><span>NeuroSoin</span></h1><h3>For better diagnosis streamlines
record-keeping.</h3>   </div>
    <div className='right'/>
</div>

<div className='second_prt'>
    <div className='text1'> The future of Full digitization of patients records</div>
    <div className='text2'>Neurosoin revolutionizes the way you manage patient care with its cutting-edge Electronic Health Records (EHR) platform. Crafted with precision, NeuroSoin offers unparalleled customization to suit your unique requirements.<br/>Imagine spending more time engaging with your patients, listening to their concerns, and delivering quality care, rather than being bogged down by administrative tasks. With NeuroSoin's intuitive interface and cloud-based infrastructure, you can do just that.</div>
</div>

<div className='tst_footer'>

<footer>
    <div className="footer-content">
        <h3 style={{margin:"0px auto"}}>Neurosoin EHR - Empowering Your Practice</h3>
        
        <div className="contact-info">
            <p>Contact Us:</p>
            <address>
                Neurosoin<br/>
                University BMA, Sidi Ammar, Annaba, 23000<br/>
                Phone: (+213) 1-23-45-67-89<br/>
                Email: <a href="mailto:neurosoin@gmail.com">info@neurosoin.com</a>
            </address>
        </div>
        
        <div className="social-media">
            <p>Connect With Us:</p>
            <div className="social-icons">
       <a href='https://www.facebook.com' target="_blank" style={{textdecoration:"none",color:"inherit"}} rel="noreferrer" >   <FaFacebook style={{fontSize:"24px",margin:"0px 5px"}}  /></a>  
       <a href='https://www.x.com' target="_blank" style={{textdecoration:"none",color:"inherit"}} rel="noreferrer" >           <FaXTwitter style={{fontSize:"24px",margin:"0px 5px"}} /> </a>  
       <a href='https://www.linkedin.com' target="_blank" style={{textdecoration:"none",color:"inherit"}} rel="noreferrer" >    <FaLinkedin style={{fontSize:"24px",margin:"0px 5px"}}/></a>  
            </div>
        </div>
        
       
    </div>
</footer>

</div>

</>
}