import React, { Component, memo } from 'react';
import { Animated, Easing } from 'react-native';
import Section from './Section';

class Anim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleProps: {},
      animArr: [],
      easing: null,
      prevChildren: null,
      hasEntered: false,
      mounted: false,
      callbackDelay: null,
    };

    this.tryCallback = this.tryCallback.bind(this);
    this.animate = this.animate.bind(this);
    this.reRun = this.reRun.bind(this);
    this.exit = this.exit.bind(this);

    this.shouldBail = this.shouldBail.bind(this);

    this.enterCallbackTimeout = null;
  }

  componentDidMount() {
    /* if (this.props.autoStart) {
      const delay = this.props.delay || 0;

      setTimeout(() => {
        return this.animate();
      }, delay);
    } */

    this.animate();
  }

  // lifecycle? let's live here!
  componentDidUpdate(pp) {
    if (this.shouldBail('didUpdate')) return;

    if (
      pp.enterOn !== true &&
      this.props.enterOn === true &&
      !this.props.bailOn
    ) {
      // console.log('anim entering...');
      return this.animate();
    } else if (
      pp.exitOn !== true &&
      this.props.exitOn === true &&
      !this.props.bailOn
    ) {
      // console.log('anim exiting...');
      return this.exit(pp);
    } else if (
      pp.rerunOnChange !== this.props.rerunOnChange &&
      this.props.exitOn !== true &&
      !this.props.bailOn
    ) {
      // console.log('anim reRunning...');
      this.reRun(pp);
    }
  }

  componentWillUnmount() {
    if (this.enterCallbackTimeout) clearTimeout(this.enterCallbackTimeout);
  }

  shouldBail(tag) {
    if (this.props.bailOn) {
      //console.log(`Bailed Animation ${tag ? `(at ${tag})` : ''}`);
      return true;
    }

    return false;
  }

  tryCallback(cb, args) {
    if (typeof cb === 'function' && !this.props.bailOn) cb(args);
  }

  reRun(prevProps, cb) {
    if (this.shouldBail('reRun')) return;

    this.setState({ prevChildren: null }, () => {
      this.animate({
        forwards: false,
        cb: () => {
          if (this.shouldBail('anim-cb1 in reRun')) return;

          this.setState({ prevChildren: null }, () => {
            this.animate({
              cb: () => {
                if (this.shouldBail('anim-cb2 in reRun')) return;

                this.tryCallback(this.props.rerunCallback);
              },
            });
          });
        },
      });
    });
  }

  exit(prevProps, cb) {
    if (this.shouldBail('exit')) return;

    this.setState({ prevChildren: prevProps.children }, () => {
      this.animate({
        forwards: false,
        cb: () => {
          if (this.shouldBail('setState in exit')) return;
          this.setState({ prevChildren: null }, () => {
            if (this.shouldBail('setState-cb in exit')) return;
            this.tryCallback(this.props.exitCallback);
          });
        },
      });
    });
  }

  handleProps(prop, forwards) {
    if (!prop) return null;
    return typeof prop === 'string' ? prop : forwards ? prop.in : prop.out;
  }

  animate(conf = {}) {
    if (this.shouldBail('animate()')) return;

    const {
      forwards = true,
      anim = this.props.anim,
      duration = this.props.duration,
      easing = this.props.easing,
      cb = conf.cb ||
        (conf.forwards === true
          ? this.props.enterCallback
          : this.props.exitCallback),
      enterCallbackDelay = this.props.enterCallbackDelay || 0,
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
          delay: this.props.delay || 0,
          useNativeDriver: true,
        })
      );
    };

    const addToStyleProps = (key, ref) => {
      styleProps[key] = ref;

      this.setState({ styleProps });
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
      if (this.shouldBail('pre start')) return;

      Animated.parallel(this.state.animArr).start(() => {
        if (this.shouldBail('start-cb')) return;

        this.setState({ hasEntered: forwards ? true : false }, () => {
          if (typeof cb === 'function') {
            this.enterCallbackTimeout = setTimeout(() => {
              clearTimeout(this.enterCallbackTimeout);
              this.enterCallbackTimeout = null;

              if (this.shouldBail('enter-cb')) return;

              cb();
            }, enterCallbackDelay);
          }
        });
      });
    });
  }

  render() {
    //console.log('anim render', this.state.styleProps);
    return (
      <Animated.View
        style={[
          this.props.style,
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
