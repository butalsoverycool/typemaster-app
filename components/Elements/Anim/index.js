import React, { Component, memo } from 'react';
import { Animated, Easing } from 'react-native';
import { propsChanged } from '../../../constants/helperFuncs';

class Anim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleProps: null,
      animArr: [],
      easing: null,
      prevChildren: null,
      hasEntered: false,
      mounted: false,
    };

    this.tryCallback = this.tryCallback.bind(this);
    this.animate = this.animate.bind(this);
    this.reRun = this.reRun.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidUpdate(pp) {
    // lifecycle? let's live here!
    if (pp.enterOn !== true && this.props.enterOn === true) {
      // console.log('anim entering...');
      return this.animate();
    } else if (pp.exitOn !== true && this.props.exitOn === true) {
      // console.log('anim exiting...');
      return this.exit(pp);
    } else if (
      pp.reRunOnChange !== this.props.reRunOnChange &&
      this.props.exitOn !== true
    ) {
      // console.log('anim reRunning...');
      this.reRun(pp);
    }
  }

  tryCallback(cb, args) {
    if (typeof cb === 'function') cb(args);
  }

  reRun(prevProps, cb) {
    this.setState({ prevChildren: prevProps.children }, () => {
      this.animate({
        forwards: false,
        cb: () => {
          this.setState({ prevChildren: null }, () => {
            this.animate({
              cb: () => {
                // console.log('anim ReRun done!');
                this.tryCallback(cb);
              },
            });
          });
        },
      });
    });
  }

  exit(prevProps, cb) {
    this.setState({ prevChildren: prevProps.children }, () => {
      this.animate({
        forwards: false,
        cb: () => {
          this.setState({ prevChildren: null }, () => {
            // console.log('anim Exit done!');
            this.tryCallback(cb);
          });
        },
      });
    });
  }

  handleProps(prop, forwards) {
    return typeof prop === 'string' ? prop : forwards ? prop.in : prop.out;
  }

  animate(conf = {}) {
    const {
      forwards = true,
      anim = this.props.anim,
      duration = this.props.duration,
      easing = this.props.easing,
      cb = null,
    } = conf;

    //const { anim, duration, easing } = this.props;
    if (!anim) return;

    let animArr = [];
    let styleProps = {};

    const pushToAnimArr = (ref, obj) => {
      animArr.push(
        Animated.timing(ref, {
          toValue: forwards ? obj.toValue : obj.fromValue,
          duration: this.handleProps(duration, forwards),
          easing: Easing[this.handleProps(easing, forwards)],
          useNativeDriver: true,
        })
      );
    };

    const addToStyleProps = (key, ref) => {
      styleProps[key] = ref;
    };

    Object.entries(anim).forEach(([key, val]) => {
      // if arr-prop (eg transform), do inner loop
      if (Array.isArray(val)) {
        let subProps = [];

        // for each sub-prop
        val.forEach(subVal => {
          // create ref
          let ref = new Animated.Value(
            forwards ? subVal.fromValue : subVal.toValue
          );

          // add anim
          pushToAnimArr(ref, subVal);

          // add to style sub-props
          subProps.push({
            [subVal.key]: ref,
          });
        });

        // add sub-arr to style props
        addToStyleProps(key, subProps);
      } else {
        // create ref
        let ref = new Animated.Value(forwards ? val.fromValue : val.toValue);

        // add anim
        pushToAnimArr(ref, val);

        // add to style props
        addToStyleProps(key, ref);
      }
    });

    this.setState({ styleProps, animArr }, () => {
      Animated.parallel(this.state.animArr).start(() => {
        this.setState({ hasEntered: forwards ? true : false }, () => {
          // if(forwards) console.log('anim Enter done!')

          if (typeof cb === 'function') cb();
        });
      });
    });
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            padding: 0,
          },
          this.state.styleProps,
          this.props.hideOnExit &&
            this.props.exitOn && {
              display: 'none',
            },
        ]}
      >
        {this.state.prevChildren || this.props.children}
      </Animated.View>
    );
  }
}

export default memo(p => <Anim {...p} />);