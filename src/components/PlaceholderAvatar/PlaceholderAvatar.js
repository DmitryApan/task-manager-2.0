import React, {useMemo} from 'react';
import cn from 'classnames';

import styles from './PlaceholderAvatar.module.scss';

export default function PlaceholderAvatar(props) {
    const {addUserType, size} = props;

    const getStylePlaceholder = useMemo(() => ({
        height: `${size}px`, 
        width: `${size}px`,
        borderWidth: `${size * 0.05}px`
    }), [size]);     

    const headClass = cn({
        [styles.borderGrey]: addUserType
    }, styles.symbolHead);

    const shouldersClass = cn({
        [styles.borderGrey]: addUserType
    }, styles.symbolShoulders);

    const borderPlaceholderClass = cn({
        [styles.borderPlaceholderAddUser]: addUserType,
    }, styles.borderPlaceholder);       

    return (
        <div 
            className={borderPlaceholderClass} 
            style={getStylePlaceholder}
        >
            <div className={headClass} />
            <div className={shouldersClass} />
            {addUserType && 
                <div className={styles.outerPlus}>
                    <div className={styles.verticalPlus} />
                    <div className={styles.horizontPlus} />
                </div>
            }
        </div>
    )
}