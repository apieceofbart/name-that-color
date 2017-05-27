import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { ChromePicker as ColorPicker } from 'react-color';
import Background from './Background/Background';
import { isHexColor, getRandomColorFromData, getClosestColor, translations, isColorDark } from './utils/utils';

const LANGUAGES = Object.keys(translations);

class ColorValidator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '000000',
      closest: {
        color: '000000',
        name: 'black'
      },
      lang: 'en'
    }
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  componentWillMount() {
    this.setLanguage(this.props);
    this.setColor(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.lang !== this.state.lang) {
      this.setLanguage(nextProps);
    }
  }

  setLanguage(props) {
    const { lang } = props.match.params || 'en';

    this.setState(state => ({
      ...state,
      lang
    }), () => {
      const color = {
        hex: '#' + this.state.color
      }
      this.handleChangeComplete(color);
    })
  }

  setColor(props) {
    const { hex } = props.match.params;

    const randomColor = getRandomColorFromData(this.state.lang);

    this.setState(state => {
     const color = isHexColor(hex) ? hex : randomColor;

     return {
      ...state,
       color
     };
    });
  }

  handleChangeComplete(color) {
    const newColor = color.hex.slice(1);

    const { closest } = getClosestColor(newColor, this.state.lang);
    const newClosest = {
      color: closest.hex.toLowerCase().slice(1),
      name: closest.name
    }

    this.setState(state => ({
      ...state,
      color: newColor,
      closest: newClosest
    }))

    const { lang } = this.state;

    this.props.history.push(`/${lang}/${newClosest.color}`);
  }


  render() {
    const { color, closest, lang } = this.state;
    const borderAndTextColor = isColorDark(color) ? 'white' : 'black';
    const passColor = `#${color}`;
    const boxStyle = {
       backgroundColor: passColor
    }

    const globalStyles = {
      color: borderAndTextColor,
      borderColor: borderAndTextColor
    };

    const links = LANGUAGES.map(lang => {
      const link = `/${lang}/${closest.color}`;

      return <NavLink activeClassName="selected" key={lang} to={link}>{lang}</NavLink>
    });



    return (
      <div className="container" style={globalStyles}>
        <div className="links">
          { links }
        </div>
        <h1>{ closest.name } </h1>
        <h3>{translations[lang].YOU_PICKED}:</h3>
        <div className="color-box" style={boxStyle}>#{ color }</div>
        <h3>{translations[lang].CLOSEST_COLOR}: #{closest.color}</h3>
        <ColorPicker presetColors={[]} disableAlpha color={passColor}  onChangeComplete={ this.handleChangeComplete } />
        <Background color={closest.color}/>
      </div>
    )
  }
}


export default ColorValidator;
