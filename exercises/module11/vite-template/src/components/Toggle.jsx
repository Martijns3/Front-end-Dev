import { useState } from "react";

// export class ToggleOld extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { isToggleOn: true };
//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick() {
//         this.setState((prevState) => ({
//             isToggleOn: !prevState.isToggleOn,
//         }));
//     }

//     render() {
//         return (
//             <button onClick={this.handleClick}>
//                 {this.state.isToggleOn ? "ON" : "OFF"}
//             </button>
//         );
//     }
// }

export const Toggle = () => {
    const [isToggleOn, setToglleOn] = useState(false);
    const handleClick = () => {
        setToglleOn(!isToggleOn);
    };
    return <button onClick={handleClick}>{isToggleOn ? "ON" : "OFF"}</button>;
};
