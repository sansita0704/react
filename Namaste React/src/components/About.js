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
            <div className="flex-container about">
                <h1>Get to Know Us</h1>
                <div className="about-content">
                    <User></User>
                    <UserClass name={"Sansita Jain (class)"} />
                </div>
            </div>
        );
    }
}

/*
const About = () => {
    return (
        <div className="flex-container about">
            <h1>Get to Know Us</h1>
            <div className="about-content">
                <UserClass name={"Sansita Jain (class)"} />
            </div>
        </div>
    );
};
*/

export default About;
