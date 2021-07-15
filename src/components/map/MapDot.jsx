import React from "react";
import CircleIcon from '@material-ui/icons/Circle';

const MapDot = ({ size, color, onClick }) => (
    <CircleIcon onClick={onClick} style={{ fontSize: size, color }} />
);

export default MapDot;
