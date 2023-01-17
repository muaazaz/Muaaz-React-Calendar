import { Link } from 'react-router-dom'
import { useEffect } from "react";



const Navbar = () => {

        const checkLogin = async () =>{
            const token = localStorage.getItem('token')
            if(!token){
                const lg = document.querySelector('.lgot')
                const crt = document.querySelector('.crt')
                const crt1 = document.querySelector('.crt1')
                const eml = document.querySelector('.eml')

                crt.style.display = 'none'
                crt1.style.display = 'none'
                lg.style.display = 'none'
                eml.style.display = 'none'

            }else{
               
                const lg = document.querySelector('.lgot')
                const crt = document.querySelector('.crt')
                const crt1 = document.querySelector('.crt1')
                const lgin = document.querySelector('.lgin')
                const sgn = document.querySelector('.sgn')
                const eml = document.querySelector('.eml')

                eml.innerHTML = 'Welcome! '+localStorage.getItem('email')
                lgin.style.display = 'none'
                sgn.style.display = 'none'
                crt.innerHTML = 'Create Timely Event'
                crt1.innerHTML = 'Create All Day Event'
                lg.innerHTML = 'Log Out'
            }
        }
        useEffect(()=>{
            checkLogin()
        })
    return (
        <nav className="navbar">
            <img src="" alt="" />
            <ul className='list'>
                <li>
                    <Link to='/' className='lnk1' refresh='true'><img src="/logo.png" alt="" /></Link>
                </li>
                <li>
                    <Link className='sgn lnk' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Link className='lgin lnk' to='/login'>Log In</Link>
                </li>
                <li>
                    <span className='eml'> </span>
                </li>
                <li>
                    <Link className='crt lnk' to='/create/event'></Link>
                </li>
                <li>
                    <Link className='crt1 lnk' to='/create/alldayevent'></Link>
                </li>
                <li>
                    <Link className='lgot lnk' to='/logout'></Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;