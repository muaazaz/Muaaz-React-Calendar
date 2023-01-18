import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [error, setError] = useState('')
    const [birthdate, setBirth] = useState()
    const [firstName, setFname] = useState('')
    const [lastName, setLname] = useState('')
    const [userName, setUserName] = useState('')
    const current = new Date().toISOString().split("T")[0]

    const handleSubmit = async () => {
        if(firstName === lastName){
            setError((v)=>('First-name and Last-name cannot be same'))
        }else{
            const res = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({firstName,lastName, userName, birthdate, email, password })
            })
            const data = await res.json()
            if(data.user){
                const decodedToken = jwtDecode(data.token)
                const id = decodedToken.id
                if(id === data.user._id){
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('email',data.user.email)
            
                    history.push('/')
                    window.location.reload()
                }else{
                    setError((v)=>('user not found'))
                }
            }else if(data.error){
                setError((v)=>(data.error))
            }
        }      
    }
    const handleChange = (e) => {
        setBirth((b) => (e.target.value))
    }
    return (
        <div className="create">
            <h1>Sign Up</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <label className="lbl" >First Name:</label>
                <input className="inp" type="text"
                    required
                    value={firstName}
                    maxLength={10}
                    placeholder='please enter your first name'
                    onChange={(e) => {
                        setError((v) => (''))
                        setFname(e.target.value)
                    }}
                />
                <label className="lbl">Last Name:</label>
                <input className="inp" type="text"
                    required
                    value={lastName}
                    maxLength={10}
                    placeholder='please enter your last name'
                    onChange={(e) => {
                        setError((v) => (''))
                        setLname(e.target.value)
                    }}
                />
                <label className="lbl">User Name:</label>
                <input className="inp" type="text"
                    required
                    value={userName}
                    maxLength={15}
                    placeholder='please enter a unique User name not more than 15 characters'
                    onChange={(e) => {
                        setError((v) => (''))
                        setUserName(e.target.value)
                    }}
                />
                <label className="lbl" >Date Of Birth:</label>
                <input className="inp" type='date'
                    value={birthdate}
                    onChange={handleChange}
                    max={current}
                />
                <label className="lbl">Email:</label>
                <input className="inp" type="text"
                    required
                    value={email}
                    maxLength={30}  
                    placeholder='please enter an email that is unique'
                    onChange={(e) => {
                        setError((v) => (''))
                        setEmail(e.target.value)
                    }}
                />
                <label className="lbl">Password:</label>
                <input className="inp" type="password"
                    required
                    value={password}
                    minLength={8}
                    placeholder='please enter a password more than 8 characters long'
                    onChange={(e) => {
                        if(e.target.value.length < 8){
                            setError((v)=>('Pasword must be 8 characters long at minimum'))
                            setPass(e.target.value)
                        }else{
                            setError((v) => (''))
                            setPass(e.target.value)
                        }
                    }}
                />

                {error && <h5 className="error">{error}</h5>}
                <button className="create-btn">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;