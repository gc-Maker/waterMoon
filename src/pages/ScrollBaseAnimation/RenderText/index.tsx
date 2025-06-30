import React, { PureComponent } from 'react';
import classNames from 'classnames';
import style from './index.less';

export default class RenderText extends PureComponent {
    render() {
        return (
            <>
                <div className={style.textContainer}>
                    <div className={style.text}>Test Text</div>
                    <div className={classNames(style.text, style.right)}>
                        Test Text1
                    </div>
                    <div className={style.text}>Test Text2</div>
                </div>
            </>
        );
    }
}
