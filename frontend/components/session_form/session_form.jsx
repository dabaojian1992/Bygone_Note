
import React from 'react';

class SessionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: ""
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    Hey
                    <br/>
                    <div>
                        
                    </div>

                </form>
            </>
        )
    }

}