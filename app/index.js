import React from 'react';
import { render } from 'react-dom';
import { Game } from './components';
import "./game.css";

render(<Game size="2X2" />,document.getElementById('r-app'));