import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollSpy(
  categoryIds: string[],
  initialActiveCategory?: string
) {
  const [activeCategory, setActiveCategory] = useState(
    initialActiveCategory || categoryIds[0]
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Used to assign refs to each section
  const setCategoryRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  // Scroll to category
  const scrollToCategory = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 120; // adjust for sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!categoryIds.length) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the section closest to the top (and visible)
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveCategory(visible[0].target.id.replace("category-", ""));
      }
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px 0px -70% 0px", // adjust for your sticky nav height
      threshold: 0.1,
    });

    categoryIds.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categoryIds]);

  return {
    activeCategory,
    scrollToCategory,
    setCategoryRef,
  };
}
