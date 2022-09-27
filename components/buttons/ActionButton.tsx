import React from "react";

interface ActionButtonProps {
    glow: boolean,
    children: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const defaultProps = {
    onClick: undefined
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return props.glow? <button onClick={props.onClick} className={`bg-blue-700 p-4 rounded-md shadow-sm shadow-blue-700 text-white font-semibold`}>
        {props.children}
    </button> : <button className={`bg-blue-700 p-4 rounded-md shadow-xl text-white font-semibold`}>
        {props.children}
    </button>
}

ActionButton.defaultProps = defaultProps

export default ActionButton