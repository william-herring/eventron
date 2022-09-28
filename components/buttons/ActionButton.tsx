import React from "react";

interface ActionButtonProps {
    glow: boolean,
    children: React.ReactNode,
    onClick: () => void
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return props.glow? <button onClick={props.onClick} className={`bg-blue-700 p-4 rounded-md shadow-sm shadow-blue-700 text-white font-semibold`}>
        {props.children}
    </button> : <button onClick={props.onClick} className={`bg-blue-700 p-4 rounded-md shadow-xl text-white font-semibold hover:bg-blue-800`}>
        {props.children}
    </button>
}

export default ActionButton