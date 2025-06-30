import React, { PureComponent } from 'react';
import RenderText from './RenderText';
import ScrollThreejsComponent from './ScrollThreejsComponent';

export default class ScrollBaseAnimation extends PureComponent {
    render() {
        return (
            <>
                <ScrollThreejsComponent />
                <RenderText />
            </>
        );
    }
}
