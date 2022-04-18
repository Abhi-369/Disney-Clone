import React, { useEffect } from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { provider, auth } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/user/userSlice'

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                history('/home');
            }
        })
    }, [userName])

    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider).then((result) => {
                setUser(result.user);

            }).catch((err) => {
                alert(err.message);
            });
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState())
                history('/')
            }).catch((err) => alert(err.message));
        }
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        )
    }

    return <Nav>
        <Logo>
            <img src="/images/logo.svg" alt="" />
        </Logo>

        {
            !userName ?
                <Login onClick={handleAuth}>Login</Login>
                :
                <>
                    <NavMenu>
                        <a href="/home">
                            <img src="/images/home-icon.svg" alt="Home" />
                            <span>HOME</span>
                        </a>
                        <a >
                            <img src="/images/search-icon.svg" alt="search" />
                            <span>SEARCH</span>
                        </a>
                        <a >
                            <img src="/images/watchlist-icon.svg" alt="watchlist" />
                            <span>WATCHLIST</span>
                        </a>
                        <a >
                            <img src="/images/original-icon.svg" alt="original" />
                            <span>ORIGINALS</span>
                        </a>
                        <a >
                            <img src="/images/movie-icon.svg" alt="movie" />
                            <span>MOVIES</span>
                        </a>
                        <a >
                            <img src="/images/series-icon.svg" alt="series" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>

                    <SignOut>
                        <UserImg src={userPhoto} alt={userName} />
                        <DropDown>
                            <span onClick={handleAuth}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>
        }

    </Nav>;
};

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
border: 0.2px solid #fff;
letter-spacing: 16px;
z-index: 2;
`
const Logo = styled.a`
width: 100px;
padding: 0;
max-height: 70px;
display: inline-block;

img {
    display: block;
    width: 100%;
}
`
const NavMenu = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
position: relative;
margin-right: auto;
margin-left: 30px;

a {
    display: flex;
    align-items: center;
    padidng: 0 12px;
    margin: 10px;
    background: linear-gradient(to bottom, var(--mainColor) 0%, var(--mainColor) 100%);
    background-position: 0 100%;
    color: #000;
    text-decoration: none;

    img{
        height: 20px;
        min-width: 20px;
        width: 20px;
        margin-top: -3px;
        margin-right: 2px;
        z-index: auto;
    }
    span{
        color: rgb(249, 249, 249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;

        &:hover {
            color: #4EA8C9;
            cursor: pointer;
        }
}

}
@media (max-width: 768px) {
    display: none;
}
`
const DropDown = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgba(19, 19, 19);
border: 1px solid rgba(151, 151, 0.3);
border-radius: 5px;
box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
font-size: 12px;
padding: 10px;
width: 100px;
letter-spacing: 3px;
opacity: 0;
`
const Login = styled.a`
background-color: rgba(0, 0, 0, 0.6);
padding: 8px 16px;
text-transform: uppercase;
letter-spacing: 1.5px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 1s ease 0s;

&:hover {
    background-color: #f9f9f9;
    color: #000;
    cursor: pointer;
}
`
const UserImg = styled.img`
height: 100%;
`
const SignOut = styled.div`
position: relative;
height: 48px;
width: 48px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;

${UserImg} {
    border-radius: 100px;
    width: 100%;
    height: 100%;
}

&:hover{
    ${DropDown} {
        opacity: 1;
        transition-duration: 1s;
    }
}
`
export default Header;