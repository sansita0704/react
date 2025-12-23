import { Component } from "react";
import UserClass from "./UserClass";
import User from "./User";

class About extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="flex flex-col items-center my-7">
                <h1 className="text-4xl font-bold">Get to Know Us</h1>
                <div className="flex">
                    <User name={"Sansita Jain (function)"} />
                    <UserClass />
                </div>
            </div>
        );
    }
}

export default About;
