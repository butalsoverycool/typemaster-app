import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Section, Text, Anim } from '../Elements';
import { withState } from '../GameState';
import { Dimensions } from 'react-native';
import { usePrev } from '../../constants/helperFuncs';

const starSize = Dimensions.get('window').width / 5 - 5;
const handSize = Dimensions.get('window').width / 2;

const Hand = ({ success = false, bail }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (bail) return;

    if (success) setStart(true);
    else if (start) {
      setStart(false);
    }
  }, [success]);

  return (
    <Section
      style={{ position: 'absolute', zIndex: 3, opacity: start ? 1 : 0 }}
    >
      <Anim
        enterOn={start}
        exitOn={success !== true}
        bailOn={bail}
        duration={{ in: 1000, out: 300 }}
        easing={{ in: 'ease-in-out' }}
        anim={{
          transform: [
            {
              key: 'translateY',
              fromValue: 200,
              toValue: 0,
            },
          ],

          opacity: {
            fromValue: 0,
            toValue: 1,
          },
        }}
        style={{
          opacity: 0,
          position: 'absolute',
          zIndex: 3,
          transform: [{ translateY: success ? 200 : 500 }],
        }}
      >
        <Image
          style={{ width: handSize, height: handSize }}
          source={require('../../assets/gifs/hands.gif')}
          resizeMode="contain"
        />
      </Anim>
    </Section>
  );
};

const Finger = ({ success, poff, poffCallback, bail }) => {
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    if (bail) {
      if (delay) {
        return clearInterval(delay);
      }
    }

    if (poff) {
      setDelay(
        setTimeout(() => {
          if (bail) return clearInterval(delay);

          poffCallback();
        }, 2000)
      );
    }
  }, [poff]);

  /* useEffect(() => {
    if()
  }, [success]) */

  return (
    <Section align="flex-start" w={starSize}>
      {poff ? (
        <Image
          style={{ width: starSize, height: starSize }}
          source={require('../../assets/gifs/poff.gif')}
        />
      ) : (
        <Image
          style={{ width: starSize, height: starSize }}
          resizeMode="contain"
          source={require('../../assets/gifs/finger.gif')}
        />
      )}
    </Section>
  );
};

const Stars = ({
  gameState: { typed, achievements, gameON, gamePaused, gameStandby, sounding },
  gameSetters: { playSound },
}) => {
  /* 
    when yeah, add star, 
    when no, remove all stars
*/

  const [stars, setStars] = useState([]);
  const [cachedStars, setCachedStars] = useState([]);
  const [delay] = useState(null);
  const [poff, setPoff] = useState(false);
  const [success, setSuccess] = useState(false);

  const prevSounding = sounding ? usePrev(sounding) : [];

  const reset = () => {
    if (!gameON && !gamePaused && !gameStandby) {
      return;
    }

    setStars([]);
    setPoff(false);
  };

  const handleStars = (input = []) => {
    setStars(input);
    /* if (success) {
      if(cachedStars.length <= 5) {
        setCachedStars(input);
      }
      else {
        setSuccess(false)
      }
    } else {
      if (cachedStars.length > 0) {
        let cached = [...cachedStars];
        setStars(cached);
        setCachedStars([]);
      } else {
        setStars(input);
      }
    } */
  };

  useEffect(() => {
    let active = gameON || gamePaused || gameStandby ? true : false;

    if (!active) {
      if (delay) {
        clearInterval(delay);
      }
      return;
    }

    if (achievements.words < 1) {
      if (stars.length > 0) {
        setPoff(true);
        playSound('pop');
      }

      if (success) setSuccess(false);
      return;
    }

    if (typed.remaining[0] !== ' ') return;

    if ((achievements.words / 20 + 0.8) % 1 === 0) {
      handleStars([0]);
    } else if ((achievements.words / 20 + 0.6) % 1 === 0) {
      handleStars([0, 1]);
    } else if ((achievements.words / 20 + 0.4) % 1 === 0) {
      handleStars([0, 1, 2]);
    } else if ((achievements.words / 20 + 0.2) % 1 === 0) {
      handleStars([0, 1, 2, 3]);
    } else if (achievements.words >= 20 && achievements.words % 20 === 0) {
      handleStars();
      if (!success) {
        setSuccess(true);
      }
    }

    return () => (active = gameON || gamePaused || gameStandby ? true : false);
  }, [achievements.words]);

  useEffect(() => {
    /* handleStars(); */
    /* if (!success) {
      if (stars.length >= 5) handleStars();
    }
    else {

    } */
  }, [success]);

  useEffect(() => {
    let active = gameON || gamePaused || gameStandby ? true : false;

    if (!active || !prevSounding) return;

    const prevPlaying = prevSounding.some(sound => sound.name === 'nice');
    const nicePlaying = sounding.some(sound => sound.name === 'nice');

    if (prevPlaying && !nicePlaying) {
      setSuccess(false);
    }

    return () => (active = gameON || gamePaused || gameStandby ? true : false);
  }, [sounding.length]);

  return (
    <Section
      padding={10}
      spaceTop={0}
      align="flex-start"
      row
      justify="flex-start"
      position="relative"
      style={{ zIndex: 3 }}
    >
      <Hand
        success={success === true}
        bail={!gameON && !gamePaused && !gameStandby}
      />

      {!success &&
        stars.map((star, nth) => (
          <Finger
            key={nth}
            success={success}
            poff={poff}
            poffCallback={reset}
            bail={!gameON && !gamePaused && !gameStandby}
          />
        ))}
    </Section>
  );
};

export default withState(Stars);
