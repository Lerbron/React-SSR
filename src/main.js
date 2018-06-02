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
                <div>11124444422</div>
                {ChildInstance}
             </div>
        )
    }
}