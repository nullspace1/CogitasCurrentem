import React from "react"

interface TitleProp {
    title : string
}

export const Title = ({title} : TitleProp) => {
    return (
        <div className="Title">
        {title}
        </div>
    )
}
