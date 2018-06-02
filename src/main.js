import React, {Component} from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {children} = this.props;
        const ChildInstance = React.Children.only(children);
        
        return(
            <div>
                {ChildInstance}
             </div>
        )
    }
}