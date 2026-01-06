import { Component } from "react";
import UserClass from "./UserClass";
import User from "./User";
import UserContext from "../utils/UserContext";

class About extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="flex flex-col items-center my-7">
                <h1 className="text-4xl font-bold">Get to Know Us</h1>
                <p>
                    Logged In User:{" "}
                    <UserContext.Consumer>
                        {(data) => data.loggedInUser}
                    </UserContext.Consumer>
                </p>
                <div className="flex">
                    <User name={"Sansita Jain (function)"} />
                    <UserClass />
                </div>
            </div>
        );
    }
}

export default About;
