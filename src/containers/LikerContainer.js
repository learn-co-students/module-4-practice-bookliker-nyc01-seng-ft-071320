import React from "react";
import {List} from "semantic-ui-react";

class LikerContainer extends React.Component {

    likers = () => {
        return this.props.displayed.users.map(user => <List.Item icon="user" key={user.id} content={user.username} />)
    }

    render() {
        return (
            this.likers()
        )
    }
}



export default LikerContainer