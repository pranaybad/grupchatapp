import React ,{useState,useEffect}from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

import {useAuth} from '../contexts/AuthContext'
import axios from "axios";

const Chats =()=>{
    const history = useHistory();
    const {user} = useAuth();
    const [loading,setLoading]=useState(true);

    const handleLogout = async()=>{
        await auth.signOut();

        history.push('/');
    }



    const getFile = async(url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }
    useEffect(()=>{
        if(!user){
            history.push('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "prject-id":"4a54e20e-59b0-4d28-bd97-0ecb64fd5b91",
                "user-name": user.email,
                "user-sercret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            // formdata.append('username', user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar.name)

                    axios.post('https://api.chatengine.io/users',
                        formdata,
                        {headers:{"private-key": "47fe99d5-19a4-4e30-b789-e9dbf903e214" }}
                    )
                    .then(() => setLoading(false))
                    .catch((error)=>console.log(error))
                })
        })
    },[user,history]);

    // if(!user || loading)return 'Loading...';

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Pbchat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
            height="calc(100vh -66px)"
            projectID="4a54e20e-59b0-4d28-bd97-0ecb64fd5b91" 
            userName="{user.email}"
            userSecret="{user.uid}"
            />

        </div>
    );
}

export default Chats;