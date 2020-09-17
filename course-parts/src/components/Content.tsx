import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';

const Content: React.FC<{ courseParts: any }> = ({ courseParts }) => {
    return courseParts.map((part: CoursePart) => (<Part key={ part.name } part={ part } />))
}

export default Content;