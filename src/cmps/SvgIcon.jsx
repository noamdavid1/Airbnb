import React from 'react';
import { svgService } from '../services/svg.service';

const SvgIcon = ({ iconName }) => {
    let svg = svgService.getSvg(iconName);

    if (!svg) {
        svg = svgService.getSvg('default-amenity');
    }

    return (
        <i dangerouslySetInnerHTML={{ __html: svg }} ></i>
    );
}

export default SvgIcon;