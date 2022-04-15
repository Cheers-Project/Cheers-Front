import { useEffect } from 'react';

const useInterSectionObserver = ({
  root = null,
  rootMargin = '0px',
  target,
  handleIntersect,
  threshold = 1.0,
  enabled = true,
}) => {
  useEffect(() => {
    // 동작중이 아니라면 실행x
    if (!enabled) return;

    const options = {
      root,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries[0].isIntersecting && handleIntersect();
    }, options);

    const el = target.current;

    // 감지 대상이 존재하지 않는다면 감지x
    if (!el) return;

    observer.observe(target.current);

    return () => observer.unobserve(el);
  }, [target.current, enabled]);
};

export default useInterSectionObserver;
