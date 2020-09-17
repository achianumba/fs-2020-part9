import React from 'react';
import { CoursePart } from '../index';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (<p>{ part.name } { part.exerciseCount } { part.description }</p>);
        case "Using props to pass data":
            return (<p>{ part.name } { part.exerciseCount } { part.groupProjectCount }</p>);
        case "Deeper type usage":
            return (<p>{ part.name } { part.exerciseCount } { part.description } { part.exerciseSubmissionLink }</p>);
        case 'TypeScript':
            return (<p>{ part.name } { part.exerciseCount } { part.description } { part.prerequisites }</p>);
    }
}

export default Part;