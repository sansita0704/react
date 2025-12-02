import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        // console.log(this);

        super(props);

        this.state = {
            userInfo: {
                name: "dummy",
                location: "defaultLocation",
            },
        };
    }

    async componentDidMount() {
        const response = await fetch(
            "https://api.github.com/users/sansita0704"
        );
        const data = await response.json();

        console.log(data);
        this.setState({ userInfo: data });
    }

    render() {
        // const { name } = this.props;
        const { name, location, avatar_url } = this.state.userInfo;
        // debugger;
        return (
            <div className="flex-container user-card">
                <img className="user-img" src={avatar_url}></img>
                <h2>{name}</h2>
                <h3>{location}</h3>
                <p>sansita@gmail.com</p>
            </div>
        );
    }
}

export default UserClass;
