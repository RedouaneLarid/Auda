import profilePic from "../statics/images/profilePic.png";

const UserMenu = () => {
    return (
        <div className="user">
            <img src={profilePic} alt="" />
            <div className="info">
                <h1>REDOUANE LARID</h1>
                <h3>Status</h3>
            </div>
        </div>
    );
}

export default UserMenu;