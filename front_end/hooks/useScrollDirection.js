import React, {useState, useEffect, useRef} from 'react';

const useScrollDirection = () => {
	const prevScrollY = useRef(0)
	const [goingUp, setGoingUp] = useState(true);
  
	const handleScroll = () => {
	  const currentScrollY = window.scrollY;
	  if (prevScrollY.current < currentScrollY && goingUp) {
		setGoingUp(false);
	  }
	  if (prevScrollY.current > currentScrollY && !goingUp) {
		setGoingUp(true);
	  }
	  prevScrollY.current = currentScrollY;
	};
  
	useEffect(() => {
	  window.addEventListener("scroll", handleScroll);
	  return () => window.removeEventListener("scroll", handleScroll);
	}, [goingUp]); 
	return goingUp ? 'up' : 'down';
  }

export default useScrollDirection;
