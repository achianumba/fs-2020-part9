import React from 'react';

export interface Course {
    name: string
    exerciseCount: number
}

const Content: React.FC<{ courseParts: any }> = ({ courseParts }) => {
    return courseParts.map((part: Course) => (<p key={ part.name }>{ part.name } { part.exerciseCount }</p>))
}

export default Content;