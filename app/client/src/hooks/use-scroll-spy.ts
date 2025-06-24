import { useEffect, useRef, useState } from "react";

export function useScrollSpy(categoryIds: string[]) {
  const [activeCategory, setActiveCategory] = useState(categoryIds[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Function to scroll to a category
  const scrollToCategory = (categoryId: string) => {
    setIsScrolling(true);
    setActiveCategory(categoryId);

    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Reset scrolling flag after animation
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Set ref for a category
  const setCategoryRef =
    (categoryId: string) => (el: HTMLDivElement | null) => {
      categoryRefs.current[categoryId] = el;
    };

  // Handle scroll-based category detection
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const categoryElements = Object.entries(categoryRefs.current)
        .filter(([, element]) => element !== null)
        .map(([id, element]) => ({ id, element: element! }));

      const scrollPosition = window.scrollY + 200;

      // Find the category that's currently in view
      for (let i = categoryElements.length - 1; i >= 0; i--) {
        const { id, element } = categoryElements[i];
        if (element.offsetTop <= scrollPosition) {
          if (id !== activeCategory) {
            setActiveCategory(id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory, isScrolling]);

  return {
    activeCategory,
    scrollToCategory,
    setCategoryRef,
  };
}
