import logo from "../../statics/images/logo.png";
import UserMenu from "../UserMenu";
import profile from "../../statics/images/profile.png";
import dashboard from "../../statics/images/dashboard.png";
import library from "../../statics/images/bookmarks.png";
import { useEffect } from "react";
import Player from "../Player";

const Home = () => {

    useEffect(() => {
        window.electron.getAudioFiles();
    }, []);

    return (
        <main className="home">
            <div className="sidebar-left">
                <div className="logo">
                    <img src={logo} alt="" />
                    <h1>AUDA</h1>
                </div>
                <div className="title-break">
                    <h1>Menu</h1>
                    <div className="line-break"></div>
                </div>
                <div className="menu-left">
                    <div className="profile flex gap-10 px-6 py-3 w-full">
                        <img src={profile} alt="" />
                        <h1>Profile</h1>
                    </div>
                    <div className="dashboard flex gap-10 px-6 py-3 w-full">
                        <img src={dashboard} alt="" />
                        <h1>Dashboard</h1>
                    </div>
                    <div className="library flex gap-10 px-6 py-3 w-full">
                        <img src={library} alt="" />
                        <h1>Library</h1>
                    </div>
                </div>
                <div className="title-break">
                    <h1>Help</h1>
                    <div className="line-break"></div>
                </div>
                <div className="menu-left">
                    <div className="settings flex gap-10 px-6 py-3 w-full">
                        <img src={dashboard} alt="" />
                        <h1>Settings</h1>
                    </div>
                    <div className="FAQs flex gap-10 px-6 py-3 w-full">
                        <img src={dashboard} alt="" />
                        <h1>FAQs</h1>
                    </div>
                </div>
            </div>
            <div className="sidebar-right">
                <UserMenu />
            </div>
            <div className="header">
                <form action="" className="searchbar">
                    <input type="text" name="query" placeholder="Search Audio, Podcast, Author" autoComplete="Off" />
                </form>
            </div>
            <div className="content">
                <ul id="audio-list"></ul>
            </div>
            <div className="lowerbar">
                <Player />
            </div>
        </main>
    );
}

export default Home;