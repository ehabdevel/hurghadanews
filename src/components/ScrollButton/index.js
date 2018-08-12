import React from 'react'

const scrollstyle = {
    opacity: '0.3',
    width: '40px',
    height: '40px',
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    borderRadius: '5px',
    border: 'none',
}

const arrowUpstyle = {
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-11px',
    marginLeft: '-7px',
}

class ScrollButton extends React.Component {
  constructor() {
    super();

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
      return <button title='Back to top' className='hoverable' style={scrollstyle} 
               onClick={ () => { this.scrollToTop(); }}>
                <span className="" style={arrowUpstyle}><i className="fa fa-chevron-up" aria-hidden="true"></i></span>
              </button>;
   }
} 

export default ScrollButton
