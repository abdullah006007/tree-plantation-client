import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { useInView } from 'react-intersection-observer';

const TypeWritter = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setStartTyping(inView); // Start when in view, stop when out of view
  }, [inView]);

  const handleType = (count) => {
    console.log(`Typing word ${count}`);
  };

  const handleDone = () => {
    console.log('Done one cycle');
  };

  return (
    <div ref={ref} className="text-center py-20">
      <div className="text-4xl font-semibold mb-6">
        Tree Plantation for
      </div>
      <h2 className="text-2xl font-bold text-red-500">
        {startTyping && (
          <Typewriter
            words={['Enjoy life.', 'Live better.', 'Better environment.', 'Live happy.']}
            loop={0} // No built-in loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
            onType={handleType}
            onLoopDone={handleDone}
          />
        )}
      </h2>
    </div>
  );
};

export default TypeWritter;